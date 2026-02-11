package com.project.Eccomerce.Service;

import java.util.List;

import com.project.Eccomerce.Domain.AccountStatus;
import com.project.Eccomerce.Exception.SellerException;
import com.project.Eccomerce.Model.Seller;

public interface SellerService {

	Seller getSellerProfile(String jwt) throws Exception;
	Seller createSeller(Seller seller) throws Exception;
	Seller getSellerById(Long id) throws SellerException;
	Seller getSellerByEmail(String email) throws Exception;
	List<Seller> getAllSellerByStatus(AccountStatus status);
	Seller updateSeller(Long id,Seller seller) throws Exception;
	Seller veifyEmail(String email,String otp) throws Exception;
	Seller updateSellerAccountStatus(Long sellerId,AccountStatus status) throws Exception;
	void deleteSeller(Long id) throws Exception;
}
