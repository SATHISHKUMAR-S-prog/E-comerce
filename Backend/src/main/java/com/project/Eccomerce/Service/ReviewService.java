package com.project.Eccomerce.Service;

import java.util.List;

import com.project.Eccomerce.Model.Product;
import com.project.Eccomerce.Model.Review;
import com.project.Eccomerce.Model.User;
import com.project.Eccomerce.Request.createReviewRequest;

public interface ReviewService {

	Review createReview(createReviewRequest req, User user, Product product);
	List<Review> getReviewByProductid(Long productId);
	Review updateReview(Long reviewId, String reviewText, double reviewRating,Long userId ) throws Exception;
	void deleteReview(Long reviewId, Long userId) throws Exception;
	Review getReviewByid(Long reviewId) throws Exception;
}
