package com.project.Eccomerce.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.Eccomerce.Model.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
	Cart findByUserId(Long id);
}
