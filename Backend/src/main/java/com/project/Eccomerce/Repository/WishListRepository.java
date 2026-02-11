package com.project.Eccomerce.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.Eccomerce.Model.WishList;

public interface WishListRepository extends JpaRepository<WishList, Long> {

	WishList findByUserId(Long userId);
}
