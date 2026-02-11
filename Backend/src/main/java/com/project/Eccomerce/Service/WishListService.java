package com.project.Eccomerce.Service;

import com.project.Eccomerce.Model.Product;
import com.project.Eccomerce.Model.User;
import com.project.Eccomerce.Model.WishList;

public interface WishListService {

	WishList createWishList(User user);
	WishList getWshListByUserId(User useer);
	WishList addProductToWishList(User user,Product product);
}
