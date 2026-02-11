package com.project.Eccomerce.Service.Impl;

import org.springframework.stereotype.Service;

import com.project.Eccomerce.Config.JwtProvider;
import com.project.Eccomerce.Model.User;
import com.project.Eccomerce.Repository.AddressRepository;
import com.project.Eccomerce.Repository.UserRepository;
import com.project.Eccomerce.Service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	
	private final UserRepository userRepository;
	private final JwtProvider jwtProvider;
	private final AddressRepository addressRepository;
	
	@Override
	public User findUserByJwtToken(String jwt) throws Exception {
		String email = jwtProvider.getEmailFromJwtToken(jwt);

	    return this.findByEmail(email);

	}

	@Override
	public User findByEmail(String email) throws Exception {
		User user = userRepository.findByEmail(email);
				
		if(user == null) {
			throw new Exception("user not found with email - " + email);
		}
		return user;
	}

	

}
