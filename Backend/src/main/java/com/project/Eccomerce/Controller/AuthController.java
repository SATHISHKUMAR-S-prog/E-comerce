package com.project.Eccomerce.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Eccomerce.Domain.User_Role;
import com.project.Eccomerce.Model.VerificationCode;
import com.project.Eccomerce.Request.LoginOtpRequest;
import com.project.Eccomerce.Request.LoginRequest;
import com.project.Eccomerce.Request.SignUpRequest;
import com.project.Eccomerce.Response.ApiResponse;
import com.project.Eccomerce.Response.AuthResponse;
import com.project.Eccomerce.Service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("signUp")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody SignUpRequest req) throws Exception {
//        System.out.println("Received request: " + req);
        String jwt = authService.createUser(req);

        AuthResponse res = new AuthResponse();
        if (jwt == null || jwt.isEmpty()) {
           res.setMessage("Server error,Please try again later");
            return new ResponseEntity<AuthResponse>(res,HttpStatus.INTERNAL_SERVER_ERROR);
        }

       
        res.setJwt(jwt);
        res.setMessage("Registration success");
        res.setRole(User_Role.ROLE_CUSTOMER);

        return ResponseEntity.ok(res);
    }
    
    
    @PostMapping("sent/login-signUp-otp")
    public ResponseEntity<ApiResponse> sentOtpHandler(@RequestBody LoginOtpRequest req) throws Exception {
      
       authService.sentLoginOtp(req.getEmail(),req.getRole());
     
        ApiResponse res = new ApiResponse();
       
        res.setMessage("otp send to your email, Please check it");

        return ResponseEntity.ok(res);
	}

    
    @PostMapping("signin")
    public ResponseEntity<AuthResponse> loginHandler(@RequestBody LoginRequest req) throws Exception {
      
       AuthResponse authResponse = authService.signing(req);


        return ResponseEntity.ok(authResponse);
	}

}
