package com.project.Eccomerce.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.Eccomerce.Model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
