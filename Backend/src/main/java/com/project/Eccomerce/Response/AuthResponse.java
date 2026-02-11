package com.project.Eccomerce.Response;

import com.project.Eccomerce.Domain.User_Role;

import lombok.Data;

@Data
public class AuthResponse {

	private String jwt;
	private String message;
	private User_Role role;
}
