package com.project.Eccomerce.Service.Impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.eclipse.angus.mail.iap.BadCommandException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.Eccomerce.Config.JwtProvider;
import com.project.Eccomerce.Domain.User_Role;
import com.project.Eccomerce.Model.Cart;
import com.project.Eccomerce.Model.Seller;
import com.project.Eccomerce.Model.User;
import com.project.Eccomerce.Model.VerificationCode;
import com.project.Eccomerce.Repository.CartRepository;
import com.project.Eccomerce.Repository.SellerRepository;
import com.project.Eccomerce.Repository.UserRepository;
import com.project.Eccomerce.Repository.VerificationCodeRepository;
import com.project.Eccomerce.Request.LoginRequest;
import com.project.Eccomerce.Request.SignUpRequest;
import com.project.Eccomerce.Response.ApiResponse;
import com.project.Eccomerce.Response.AuthResponse;
import com.project.Eccomerce.Service.AuthService;
import com.project.Eccomerce.Service.EmailService;
import com.project.Eccomerce.Util.OtpUtil;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CartRepository cartRepository;
    private final JwtProvider jwtProvider;
    private final VerificationCodeRepository verificationCodeRepository;
    private final EmailService emailService;
    private final CustomUserServiceImpl customUserServiceImpl;
    private final SellerRepository sellerRepository;

   
    @Override
    public String createUser(SignUpRequest req) throws Exception {
    	
    	VerificationCode verificationCode = verificationCodeRepository.findByEmail(req.getEmail());
    	
    	if(verificationCode == null || !verificationCode.getOtp().equals(req.getOtp())) {
    		throw new Exception("wrong otp...");
    	}
    
        User user = userRepository.findByEmail(req.getEmail());
        if (user == null) {
//            System.out.println("User not found, creating a new user.");
            User newUser = new User();
            newUser.setEmail(req.getEmail());
            newUser.setFullname(req.getFullname());
            newUser.setMobile("4567890032");
            newUser.setRole(User_Role.ROLE_CUSTOMER);
            newUser.setPassword(passwordEncoder.encode(req.getOtp()));

            user = userRepository.save(newUser);

            Cart cart = new Cart();
            cart.setUser(user);
            cartRepository.save(cart);
        } 

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(User_Role.ROLE_CUSTOMER.toString()));

        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateToken(authentication);

        return jwt;
    }


	@Override
	public void sentLoginOtp(String email,User_Role role) throws Exception {
		String SIGNING_PREFIX = "signing_";
		

		
		if ( email.startsWith(SIGNING_PREFIX)) {
			email = email.substring(SIGNING_PREFIX.length());
			if(role.equals(User_Role.ROLE_SELLER)) {
				Seller seller = sellerRepository.findByEmail(email);
				
				if (seller == null) {
					throw new Exception("Seller not found with this email");
				}
			}  
			else {
				User user = userRepository.findByEmail(email);
				
				if( user == null) {
					throw new Exception("User not found with this email");
				}
			}
		
		}
		
		VerificationCode isExists = verificationCodeRepository.findByEmail(email);
		
		if( isExists != null) {
			verificationCodeRepository.delete(isExists);
		}
		
		String otp = OtpUtil.generateOtp();
		
		VerificationCode verificationCode = new VerificationCode();
		verificationCode.setOtp(otp);
		verificationCode.setEmail(email);;
		verificationCodeRepository.save(verificationCode);
		
		String subject = "Eccomerse login/signup otp";
		String text = " your otp is : " + otp;
		
		emailService.sendVerficationOtpEmail(email, otp, subject, text);
		
	}


	@Override
	public AuthResponse signing(LoginRequest req) throws Exception {
		String username = req.getEmail();
		String otp = req.getOtp();
		
		Authentication authentication = authenticate(username,otp);
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String token = jwtProvider.generateToken(authentication);
		
		AuthResponse authResponse = new AuthResponse();
		authResponse.setJwt(token);
		authResponse.setMessage("Login successfully");
		
		Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
		String roleName = authorities.isEmpty()?null : authorities.iterator().next().getAuthority();
		
		authResponse.setRole(User_Role.valueOf(roleName));
		
		return authResponse;
	}


	private Authentication authenticate(String username, String otp) throws Exception {
		
		UserDetails userDetails = customUserServiceImpl.loadUserByUsername(username);
		
		if (userDetails == null) {
			throw new BadCommandException("invaild username");
		}
	
		
		VerificationCode verificationCode = verificationCodeRepository.findByEmail(userDetails.getUsername());
	
		if(verificationCode == null || !verificationCode.getOtp().equals(otp)) {
			throw new Exception("wrong otp...");
		}
		
		return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
	}

}
