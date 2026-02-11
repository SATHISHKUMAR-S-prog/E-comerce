package com.project.Eccomerce.Request;

import com.project.Eccomerce.Domain.User_Role;

import lombok.Data;

@Data
public class LoginOtpRequest {

	private String email;
	private String otp;
	private User_Role role;
}
