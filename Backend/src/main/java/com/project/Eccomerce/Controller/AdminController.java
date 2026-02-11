package com.project.Eccomerce.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Eccomerce.Domain.AccountStatus;
import com.project.Eccomerce.Model.Seller;
import com.project.Eccomerce.Model.User;
import com.project.Eccomerce.Service.SellerService;
import com.project.Eccomerce.Service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AdminController {
	
	private final SellerService sellerService;
	private final UserService userService;

	@PatchMapping("/seller/{id}/status/{status}")
	public ResponseEntity<Seller> updateSellerStatus(@PathVariable Long id,
			@RequestHeader("Authorization") String jwt,
			@PathVariable AccountStatus status) throws Exception{
		User user = userService.findUserByJwtToken(jwt);
		Seller updatedSeller = sellerService.updateSellerAccountStatus(id, status);
		return ResponseEntity.ok(updatedSeller);
	}
}
