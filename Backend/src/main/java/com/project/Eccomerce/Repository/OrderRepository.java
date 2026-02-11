package com.project.Eccomerce.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.Eccomerce.Model.Order;

public interface OrderRepository extends JpaRepository<Order,Long> {

	List<Order> findByUserId(Long userId);
	List<Order> findBySellerId(Long sellerId);
}
