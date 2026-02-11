package com.project.Eccomerce.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.Eccomerce.Model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

	List<Review> findByProductId(Long productId);
}
