package com.project.Eccomerce.Service.Impl;

import org.springframework.stereotype.Service;

import com.project.Eccomerce.Model.Product;
import com.project.Eccomerce.Model.User;
import com.project.Eccomerce.Model.WishList;
import com.project.Eccomerce.Repository.WishListRepository;
import com.project.Eccomerce.Service.WishListService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WishListServiceImpl implements WishListService {

	private final WishListRepository wishListRepository;
	
	@Override
	public WishList createWishList(User user) {
		WishList wishList = new WishList();
		wishList.setUser(user);
		return wishListRepository.save(wishList);
	}

	@Override
	public WishList getWshListByUserId(User useer) {
		
		WishList wishList = wishListRepository.findByUserId(useer.getId());
		if(wishList == null) {
			wishList = createWishList(useer);
		}
		
		return wishList;
	}

	@Override
	public WishList addProductToWishList(User user, Product product) {
		WishList wishList = getWshListByUserId(user);
		
		if(wishList.getProducts().contains(product)) {
			wishList.getProducts().remove(product);
		}
		else {
			wishList.getProducts().add(product);
		}
		return wishListRepository.save(wishList);
	}

}
