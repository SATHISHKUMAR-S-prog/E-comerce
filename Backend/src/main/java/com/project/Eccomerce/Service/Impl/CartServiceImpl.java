package com.project.Eccomerce.Service.Impl;

import org.springframework.stereotype.Service;

import com.project.Eccomerce.Model.Cart;
import com.project.Eccomerce.Model.CartItem;
import com.project.Eccomerce.Model.Product;
import com.project.Eccomerce.Model.User;
import com.project.Eccomerce.Repository.CartItemRepository;
import com.project.Eccomerce.Repository.CartRepository;
import com.project.Eccomerce.Service.CartService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

	private final CartRepository cartRepository;
	private final CartItemRepository cartItemRepository;

	@Override
	public CartItem addCartItem(User user, Product product, String sizes, int quantity) {
		 Cart cart = findUserCart(user);
		 
		 CartItem isPresent = cartItemRepository.findByCartAndProductAndSizes(cart, product, sizes);
//		 System.out.println("quanitiy - -"+quantity);
		 if( isPresent == null) {
			 CartItem cartItem = new CartItem();
			 
			 cartItem.setUserId(user.getId());
			 cartItem.setProduct(product);
			 cartItem.setQuantity(quantity);
			 cartItem.setSizes(sizes);
			 cartItem.setMrpPrice(quantity*product.getMrpPrice());
			 
			 int totalPrice = quantity*product.getSellingPrice();
			 cartItem.setSellingPrice(totalPrice);
//			 System.out.println(cartItem);
			 cart.getCartItem().add(cartItem);
			 
			 cartItem.setCart(cart);
			
			 return cartItemRepository.save(cartItem);
		 }
		return isPresent;
	}

	@Override
	public Cart findUserCart(User user) {
		Cart cart = cartRepository.findByUserId(user.getId());
//		System.out.println("cart user - - " +cart);
		int totalPrice = 0 ;
		int totalDiscountedPrice = 0 ;
		int totalItem = 0 ;
		
		for (CartItem cartItem : cart.getCartItem()) {
		    totalPrice += cartItem.getMrpPrice() != null ? cartItem.getMrpPrice() : 0;
		    totalDiscountedPrice += cartItem.getSellingPrice() != null ? cartItem.getSellingPrice() : 0;
		    totalItem += cartItem.getQuantity();
		}

		
		cart.setTotalMrpPrice(totalPrice);
		cart.setTotalSellingPrice(totalDiscountedPrice);
		cart.setTotalItem(totalItem);
		cart.setDiscount(calculateDiscountPercentage(totalPrice,totalDiscountedPrice));
		return cart;
	}
	
	
	private int calculateDiscountPercentage(int mrpPrice, int sellingPrice) {
		if(mrpPrice <= 0 ) {
//			throw new IllegalArgumentException("Actual price must be greater than zero");
			return 0;
		}
		
		double discount = mrpPrice - sellingPrice;
		double discountPercentage = (discount/mrpPrice) * 100 ;
		return (int)discountPercentage;
	}

}
