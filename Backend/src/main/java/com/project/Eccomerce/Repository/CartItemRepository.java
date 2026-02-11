package com.project.Eccomerce.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.Eccomerce.Model.Cart;
import com.project.Eccomerce.Model.CartItem;
import com.project.Eccomerce.Model.Product;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

	CartItem findByCartAndProductAndSizes(Cart cart, Product product, String sizes);
}
