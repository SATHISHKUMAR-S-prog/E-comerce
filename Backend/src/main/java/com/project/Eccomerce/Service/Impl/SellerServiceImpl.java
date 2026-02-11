package com.project.Eccomerce.Service.Impl;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.Eccomerce.Config.JwtProvider;
import com.project.Eccomerce.Domain.AccountStatus;
import com.project.Eccomerce.Domain.User_Role;
import com.project.Eccomerce.Exception.SellerException;
import com.project.Eccomerce.Model.Address;
import com.project.Eccomerce.Model.Seller;
import com.project.Eccomerce.Repository.AddressRepository;
import com.project.Eccomerce.Repository.SellerRepository;
import com.project.Eccomerce.Service.SellerService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SellerServiceImpl implements SellerService {
	
	private final SellerRepository sellerRepository;
	private final JwtProvider jwtProvider;
	private final PasswordEncoder passwordEncoder;
	private final AddressRepository addressRepository;
	
	@Override
	public Seller getSellerProfile(String jwt) throws Exception {
		String email = jwtProvider.getEmailFromJwtToken(jwt);
		return this.getSellerByEmail(email);
	}

	@Override
	public Seller createSeller(Seller seller) throws Exception {
		Seller sellerExist = sellerRepository.findByEmail(seller.getEmail());
	
		if(sellerExist != null) {
			throw new Exception("Seller Already eists ,please use another email id");
		}
		
		Address savedAddress = addressRepository.save(seller.getPickUpAddress());
		
		Seller newSeller = new Seller();
		
		newSeller.setEmail(seller.getEmail());
		newSeller.setPassword(passwordEncoder.encode(seller.getPassword()));
		newSeller.setMobile(seller.getMobile());
		newSeller.setPickUpAddress(savedAddress);
		newSeller.setSellerName(seller.getSellerName());
		newSeller.setGSTIN(seller.getGSTIN());
		newSeller.setBankDetails(seller.getBankDetails());
		newSeller.setBusinessDetails(seller.getBusinessDetails());
		newSeller.setRole(User_Role.ROLE_SELLER);
		
		return sellerRepository.save(newSeller);
	}

	@Override
	public Seller getSellerById(Long id) throws SellerException {
		return sellerRepository.findById(id).orElseThrow(() -> new SellerException("Seller is not found with this id " + id));
	}

	@Override
	public Seller getSellerByEmail(String email) throws Exception {
		Seller seller = sellerRepository.findByEmail(email);
		if(seller == null) {
			throw new Exception("Seller not found");
		}
		return seller;
	}

	@Override
	public List<Seller>  getAllSellerByStatus(AccountStatus status) {
		return sellerRepository.findByAccountStatus(status);
	}

	@Override
	public Seller updateSeller(Long id, Seller seller) throws Exception {
		Seller existingSeller = this.getSellerById(id);
		
		if(seller.getSellerName() != null) {
			existingSeller.setSellerName(seller.getSellerName());
		}
		
		if(seller.getMobile() != null) {
			existingSeller.setMobile(seller.getMobile());
		}
		
		if(seller.getEmail() != null) {
			existingSeller.setEmail(seller.getEmail());
		}
		
		if(seller.getBusinessDetails() != null && seller.getBusinessDetails().getBusinessName() != null) {
			existingSeller.getBusinessDetails().setBusinessName(seller.getBusinessDetails().getBusinessName());
		}
		
		if(seller.getBankDetails() != null 
				&& seller.getBankDetails().getAccountHolderName() != null 
				&& seller.getBankDetails().getAccountNumber()!= null 
				&& seller.getBankDetails().getIfscCode() != null) {
			
			existingSeller.getBankDetails().setAccountHolderName(seller.getBankDetails().getAccountHolderName());
			
			existingSeller.getBankDetails().setAccountNumber(seller.getBankDetails().getAccountNumber());
			
			existingSeller.getBankDetails().setIfscCode(seller.getBankDetails().getIfscCode());
			
		}
		
		if(seller.getPickUpAddress() != null 
				&& seller.getPickUpAddress().getAddress() != null
				&& seller.getPickUpAddress().getMobile() != null
				&& seller.getPickUpAddress().getState() != null
				&& seller.getPickUpAddress().getCity() != null) {
			
			existingSeller.getPickUpAddress().setAddress(seller.getPickUpAddress().getAddress());
			existingSeller.getPickUpAddress().setCity(seller.getPickUpAddress().getCity());
			existingSeller.getPickUpAddress().setState(seller.getPickUpAddress().getState());
			existingSeller.getPickUpAddress().setMobile(seller.getPickUpAddress().getMobile());
			existingSeller.getPickUpAddress().setPincode(seller.getPickUpAddress().getPincode());
		}
		
		if ( seller.getGSTIN() != null ) {
			existingSeller.setGSTIN(seller.getGSTIN());
		}
		
		return sellerRepository.save(existingSeller);
	}

	@Override
	public Seller veifyEmail(String email, String otp) throws Exception {
		Seller seller = getSellerByEmail(email);
		seller.setEmailVerified(true);
		return sellerRepository.save(seller);
	}

	@Override
	public Seller updateSellerAccountStatus(Long sellerId, AccountStatus status) throws Exception {
		Seller seller = getSellerById(sellerId);
		seller.setAccountStatus(status);
		return sellerRepository.save(seller);
	}

	@Override
	public void deleteSeller(Long id) throws Exception {
		Seller seller = getSellerById(id);
		sellerRepository.delete(seller);

	}

}
