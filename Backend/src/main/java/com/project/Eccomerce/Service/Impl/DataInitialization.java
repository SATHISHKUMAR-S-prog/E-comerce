package com.project.Eccomerce.Service.Impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.project.Eccomerce.Domain.User_Role;
import com.project.Eccomerce.Model.User;
import com.project.Eccomerce.Repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataInitialization implements CommandLineRunner{
	
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	
	@Value("${admin_email}")
	private String admin_email;
	
	@Value("${admin_password}")
	private String admin_password;
	
	@Value("${admin_name}")
	private String admin_name;

	@Override
	public void run(String... args) throws Exception {
		initialiseAdminUser();
		
	}
	
	public void initialiseAdminUser() {
		String adminUsername = admin_email;
		
		if(userRepository.findByEmail(adminUsername)== null) {
			User adminUser = new User();
			
			adminUser.setEmail(adminUsername);
			adminUser.setFullname(admin_name);
			adminUser.setPassword(passwordEncoder.encode(admin_password));
			adminUser.setRole(User_Role.ROLE_ADMIN);
			
			userRepository.save(adminUser);
		}
	}

}
