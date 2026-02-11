package com.project.Eccomerce.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Eccomerce.Model.Product;
import com.project.Eccomerce.Model.User;
import com.project.Eccomerce.Model.WishList;
import com.project.Eccomerce.Service.ProductService;
import com.project.Eccomerce.Service.UserService;
import com.project.Eccomerce.Service.WishListService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/wishlist")
public class WishListController {

	private final WishListService wishListService;
	private final UserService userService;
	private final ProductService productService;
	
//	@PostMapping("/create")
//	public ResponseEntity<WishList> createWishList(@RequestBody User useer) {
//		WishList wishList = wishListService.createWishList(useer);
//		return ResponseEntity.ok(wishList);
//	}
	
	@GetMapping
	public ResponseEntity<WishList> getWishListByUserId(@RequestHeader("Authorization") String jwt) throws Exception{
		User user = userService.findUserByJwtToken(jwt);
		WishList wishList = wishListService.getWshListByUserId(user);
		return ResponseEntity.ok(wishList);
				
	}
	
	@PostMapping("/add-product/{productId}")
	public ResponseEntity<WishList> addProductToWishList(@PathVariable Long productId,
			@RequestHeader("Authorization") String jwt) throws Exception{
//		System.out.println("jwt - -"+ jwt + "product id - - "+ productId);
		User user = userService.findUserByJwtToken(jwt);
		Product product = productService.findByProductId(productId);
//		System.out.println("user - - "+ user + "product - - "+ product.getId());
		WishList wishList = wishListService.addProductToWishList(user, product);
		return ResponseEntity.ok(wishList);
	}
	
	
}
