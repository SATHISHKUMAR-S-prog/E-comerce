package com.project.Eccomerce.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.Eccomerce.Model.Coupon;


public interface CouponRepository extends JpaRepository<Coupon, Long>{

	Coupon findByCode(String code);
}
