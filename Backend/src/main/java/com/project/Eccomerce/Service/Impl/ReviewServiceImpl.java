package com.project.Eccomerce.Service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.Eccomerce.Model.Product;
import com.project.Eccomerce.Model.Review;
import com.project.Eccomerce.Model.User;
import com.project.Eccomerce.Repository.ReviewRepository;
import com.project.Eccomerce.Request.createReviewRequest;
import com.project.Eccomerce.Service.ReviewService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

	private final ReviewRepository reviewRepository;
	
	@Override
	public Review createReview(createReviewRequest req, User user, Product product) {
		Review review =new Review();
		review.setUser(user);
		review.setProduct(product);
		review.setReviewText(req.getReviewtext());
		review.setRating(req.getReviewRating());
		review.setProductImage(req.getProductImages());
		
		product.getReviews().add(review);
		return reviewRepository.save(review);
	}

	@Override
	public List<Review> getReviewByProductid(Long productId) {
		
		return reviewRepository.findByProductId(productId);
	}

	@Override
	public Review updateReview(Long reviewId, String reviewText, double reviewRating, Long userId) throws Exception {
		Review review = getReviewByid(reviewId);
		if(!review.getUser().getId().equals(userId)) {
			review.setReviewText(reviewText);
			review.setRating(reviewRating);
			return reviewRepository.save(review);
		}
		throw new Exception("you can't updeate this review");
	}

	@Override
	public void deleteReview(Long reviewId, Long userId) throws Exception {
		Review review = getReviewByid(reviewId);
		if(!review.getUser().getId().equals(userId)) {
			throw new Exception("you can't this review");
		}
		reviewRepository.delete(review);

	}

	@Override
	public Review getReviewByid(Long reviewId) throws Exception {
		
		return reviewRepository.findById(reviewId).orElseThrow(() -> new Exception("review not found"));
	}

}
