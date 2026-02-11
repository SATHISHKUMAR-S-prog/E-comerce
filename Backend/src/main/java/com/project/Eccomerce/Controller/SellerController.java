package com.project.Eccomerce.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.Eccomerce.Domain.AccountStatus;
import com.project.Eccomerce.Model.Seller;
import com.project.Eccomerce.Model.SellerReport;
import com.project.Eccomerce.Model.VerificationCode;
import com.project.Eccomerce.Repository.VerificationCodeRepository;
import com.project.Eccomerce.Request.LoginRequest;
import com.project.Eccomerce.Response.AuthResponse;
import com.project.Eccomerce.Service.AuthService;
import com.project.Eccomerce.Service.EmailService;
import com.project.Eccomerce.Service.SellerReportService;
import com.project.Eccomerce.Service.SellerService;
import com.project.Eccomerce.Util.OtpUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sellers")
public class SellerController {

	private final SellerService sellerService;
	private final VerificationCodeRepository verificationCodeRepository;
	private final AuthService authService;
	private final EmailService emailService;
//	private final JwtProvider jwtProvider;
	private final SellerReportService sellerReportService;
	
	@Value("${frontend.url}")
	private String frontend_url;

	
	@PostMapping("/login")
	public ResponseEntity<AuthResponse> LoginSeller(@RequestBody LoginRequest req) throws Exception{
		
		req.setEmail(  "Seller_"+ req.getEmail());
	
		AuthResponse authResponse = authService.signing(req);
		
		return ResponseEntity.ok(authResponse);
	}
	
	@PostMapping("/verify/{otp}")
	public ResponseEntity<Seller> verifyEmail(@PathVariable String otp) throws Exception{
		VerificationCode verificationCode = verificationCodeRepository.findByOtp(otp);
		
		if(verificationCode == null || !verificationCode.getOtp().equals(otp)) {
			throw new Exception("wrong otp...");
		}
		
		Seller seller =sellerService.veifyEmail(verificationCode.getEmail(), otp);
		
		return ResponseEntity.ok(seller);
	}
	
	@PostMapping
	public ResponseEntity<Seller> createSeller(@RequestBody Seller seller) throws Exception {
		Seller savedSeller = sellerService.createSeller(seller);
		
		VerificationCode isExists = verificationCodeRepository.findByEmail(savedSeller.getEmail());
		
		if( isExists != null) {
			verificationCodeRepository.delete(isExists);
		}
		
		String otp = OtpUtil.generateOtp();
		VerificationCode verificationCode = new VerificationCode();
		verificationCode.setOtp(otp);
		verificationCode.setEmail(seller.getEmail());
		verificationCodeRepository.save(verificationCode);
		
		String subject = "Eccomerse login/signup otp";
		String text = " your otp is : " + otp;
		String frontend_Url = "   verify email here: "+ frontend_url+"/verify-seller";
		
		emailService.sendVerficationOtpEmail(seller.getEmail(), verificationCode.getOtp(), subject, text + frontend_Url);
		return new ResponseEntity<>(savedSeller,HttpStatus.CREATED);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Seller> getSellerById(@PathVariable Long id) throws Exception{
		Seller seller = sellerService.getSellerById(id);
		return ResponseEntity.ok(seller);
	}
	
	@GetMapping("/profile")
	public ResponseEntity<Seller> getSellerByJwt(@RequestHeader("Authorization") String jwt) throws Exception{
	
		Seller seller = sellerService.getSellerProfile(jwt);
		return ResponseEntity.ok(seller);
	}
	
	@GetMapping("/report")
	public ResponseEntity<SellerReport> getSellerReport(@RequestHeader("Authorization") String jwt) throws Exception{
		Seller seller = sellerService.getSellerProfile(jwt);
		
		SellerReport report = sellerReportService.getSellerReport(seller);
		return ResponseEntity.ok(report);
	}
	
	@GetMapping
	public ResponseEntity<List<Seller>> getSellerByStatus(@RequestParam AccountStatus status){
		List<Seller> sellers = sellerService.getAllSellerByStatus(status);
		return ResponseEntity.ok(sellers);
	}
	
	@PatchMapping("/profile")
	public ResponseEntity<Seller> updateSeller(@RequestHeader("Authorization") String jwt,@RequestBody Seller seller) throws Exception{
		Seller profile = sellerService.getSellerProfile(jwt);
		Seller updatedSeller = sellerService.updateSeller(profile.getId(),seller);
		return new ResponseEntity<Seller>(updatedSeller,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteSeller(@PathVariable Long id) throws Exception{
		sellerService.deleteSeller(id);
		return ResponseEntity.noContent().build();
	}
}
