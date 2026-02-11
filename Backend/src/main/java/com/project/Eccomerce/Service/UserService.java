package com.project.Eccomerce.Service;

import com.project.Eccomerce.Model.User;

public interface UserService {

	User findUserByJwtToken(String jwt) throws Exception;
	User findByEmail(String email) throws Exception;
}
