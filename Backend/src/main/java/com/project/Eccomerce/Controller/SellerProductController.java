package com.project.Eccomerce.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Eccomerce.Exception.ProductException;
import com.project.Eccomerce.Model.Product;
import com.project.Eccomerce.Model.Seller;
import com.project.Eccomerce.Request.createProductRequest;
import com.project.Eccomerce.Service.ProductService;
import com.project.Eccomerce.Service.SellerService;
import com.project.Eccomerce.Service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/seller/products")
public class SellerProductController {

	private final ProductService productService;
//	private final UserService userService;
	private final SellerService sellerService;
	
	@GetMapping
	public ResponseEntity<List<Product>> getProductsBySellerId(@RequestHeader("Authorization") String jwt) throws Exception {
		Seller seller = sellerService.getSellerProfile(jwt);
		
		List<Product> products = productService.getProductsBySellerId(seller.getId());
		
		return ResponseEntity.ok(products);
	}
	
	@PostMapping
	public ResponseEntity<Product> createProduct(@RequestHeader("Authorization") String jwt, 
			@RequestBody createProductRequest req) throws Exception {
		
		Seller seller = sellerService.getSellerProfile(jwt);
		System.out.println(seller);
		Product product = productService.createProduct(req, seller);
		
		return ResponseEntity.ok(product);
	}
	
	@DeleteMapping("/{productId}")
	public ResponseEntity<Void> deleteProduct(@PathVariable Long productId) throws ProductException{
	
			productService.deleteProduct(productId);
			return new ResponseEntity<>(HttpStatus.OK); 
		
	}
	
	@PutMapping("/{productId}")
	public ResponseEntity<Product> updateProduct(@RequestBody Product product, @PathVariable Long productId) throws ProductException{
	
			Product updatedproduct = productService.updateProduct(productId,product);
			return new ResponseEntity<>(updatedproduct, HttpStatus.OK); 
	
		
	}
}
