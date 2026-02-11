package com.project.Eccomerce.Service;

import com.project.Eccomerce.Domain.User_Role;
import com.project.Eccomerce.Request.LoginRequest;
import com.project.Eccomerce.Request.SignUpRequest;
import com.project.Eccomerce.Response.AuthResponse;

public interface AuthService {
	
	void sentLoginOtp(String email , User_Role role) throws Exception;
	
	String createUser(SignUpRequest req) throws Exception;
	
	AuthResponse signing(LoginRequest req) throws Exception;
	
	

}
