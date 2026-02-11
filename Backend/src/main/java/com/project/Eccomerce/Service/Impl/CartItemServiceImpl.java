package com.project.Eccomerce.Service.Impl;

import org.springframework.stereotype.Service;

import com.project.Eccomerce.Model.CartItem;
import com.project.Eccomerce.Model.User;
import com.project.Eccomerce.Repository.CartItemRepository;
import com.project.Eccomerce.Service.CartItemService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartItemServiceImpl implements CartItemService {
	
	private final CartItemRepository cartItemRepository;

	@Override
	public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws Exception {
		CartItem item = findCartItemById(id);
		
		User cartItemuser = item.getCart().getUser();
		
		if(cartItemuser.getId().equals(userId)) {
			item.setQuantity(cartItem.getQuantity());
			item.setMrpPrice(item.getQuantity() * item.getProduct().getMrpPrice());
			item.setSellingPrice(item.getQuantity() * item.getProduct().getSellingPrice());
			return cartItemRepository.save(item);
		}
		else {
			throw new Exception("you can't update other user cart item");
		}
	}

	@Override
	public void removeCartItem(Long userId, Long cartItemId) throws Exception {
		CartItem item = findCartItemById(cartItemId);
		
		User cartItemuser = item.getCart().getUser();
		
		if(cartItemuser.getId().equals(userId)) {
			cartItemRepository.delete(item);
		}
		else throw new Exception("you an't delete this items");

	}

	@Override
	public CartItem findCartItemById(Long id) throws Exception {
		
		return cartItemRepository.findById(id).orElseThrow(() -> new Exception("can't find cart item with this id - " + id));
	}

}
