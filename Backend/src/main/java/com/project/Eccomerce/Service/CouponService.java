package com.project.Eccomerce.Service;

import java.util.List;

import com.project.Eccomerce.Model.Cart;
import com.project.Eccomerce.Model.Coupon;
import com.project.Eccomerce.Model.User;

public interface CouponService {

	Cart applyCoupon(String code, double orderValue, User user) throws Exception;
	Cart removeCoupon(String code, User user) throws Exception;
	Coupon findCouponById(Long id) throws Exception;
	Coupon createCoupon(Coupon coupon);
	List<Coupon> getAllCoupon();
	void deleteCoupon(Long id) throws Exception;
}
