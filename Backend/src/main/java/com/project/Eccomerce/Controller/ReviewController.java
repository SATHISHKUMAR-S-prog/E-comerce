package com.project.Eccomerce.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Eccomerce.Model.Product;
import com.project.Eccomerce.Model.Review;
import com.project.Eccomerce.Model.User;
import com.project.Eccomerce.Request.createReviewRequest;
import com.project.Eccomerce.Response.ApiResponse;
import com.project.Eccomerce.Service.ProductService;
import com.project.Eccomerce.Service.ReviewService;
import com.project.Eccomerce.Service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ReviewController {

	private final ReviewService reviewService;
	private final UserService userService;
	private final ProductService productService;
	
	@GetMapping("/products/{productId}/reviews")
	public ResponseEntity<List<Review>> getReviewByProductId(@PathVariable Long productId){
		List<Review> reviews = reviewService.getReviewByProductid(productId);
		return ResponseEntity.ok(reviews);
	}
	
	@PostMapping("/products/{productid}/reviews")
	public ResponseEntity<Review> writeReview(@PathVariable Long productId,
			@RequestBody createReviewRequest req,
			@RequestHeader("Authorization") String jwt) throws Exception{
		
		User user = userService.findUserByJwtToken(jwt);
		Product product = productService.findByProductId(productId);
		
		Review review = reviewService.createReview(req, user, product);
		
		return ResponseEntity.ok(review);
	}
	
	@PatchMapping("/reviews/{reviewId}")
	public ResponseEntity<Review> updateReview(@PathVariable Long reviewId,
			@RequestBody createReviewRequest req,
			@RequestHeader("Authorization") String jwt) throws Exception{
		
		User user = userService.findUserByJwtToken(jwt);
		Review review = reviewService.updateReview(reviewId, req.getReviewtext(), req.getReviewRating(), user.getId());
		return ResponseEntity.ok(review);
	}
	
	@DeleteMapping("/reviews/{reviewId}")
	public ResponseEntity<ApiResponse> deleteReview(@PathVariable Long reviewId,
			@RequestHeader("Authorization") String jwt) throws Exception{
		
		User user = userService.findUserByJwtToken(jwt);
		reviewService.deleteReview(reviewId, user.getId());
	
		ApiResponse res = new ApiResponse();
		res.setMessage("Review deleted successfully");
		
		return ResponseEntity.ok(res);
	}
	
}