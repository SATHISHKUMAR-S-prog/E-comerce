package com.project.Eccomerce.Controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.Eccomerce.Exception.ProductException;
import com.project.Eccomerce.Model.Product;
import com.project.Eccomerce.Service.ProductService;
import com.project.Eccomerce.Service.SellerService;
import com.project.Eccomerce.Service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {

	private final ProductService productService;
	
	@GetMapping("/{productId}")
	public ResponseEntity<Product> getProductById(@PathVariable Long productId) throws ProductException{
		Product product = productService.findByProductId(productId);
		return ResponseEntity.ok(product);
	}
	
	@GetMapping("/search")
	public ResponseEntity<List<Product>> searchProduct(@RequestParam(required = false) String query){
		List<Product> products = productService.searchProduct(query);
		return ResponseEntity.ok(products);
	}
	
	@GetMapping
	public ResponseEntity<Page<Product>> getAllProducts(
			@RequestParam(required = false) String category,
			@RequestParam(required = false) String brand,
			@RequestParam(required = false) String color,
			@RequestParam(required = false) String sizes,
			@RequestParam(required = false) String sort,
			@RequestParam(required = false) String stock,
			@RequestParam(required = false) Integer minPrice,
			@RequestParam(required = false) Integer maxPrice,
			@RequestParam(required = false) Integer minDiscount,
			@RequestParam(defaultValue = "0") Integer pageNumber ) {
		
		return new ResponseEntity<Page<Product>>(
				productService.getAllProducts(category, color, brand, sizes, minPrice,
				maxPrice, minDiscount, sort, stock, pageNumber),HttpStatus.OK
				);
	}
			
}
