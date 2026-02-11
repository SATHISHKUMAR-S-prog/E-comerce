package com.project.Eccomerce.Service;

import com.project.Eccomerce.Model.Cart;
import com.project.Eccomerce.Model.CartItem;
import com.project.Eccomerce.Model.Product;
import com.project.Eccomerce.Model.User;

public interface CartService {

	public CartItem addCartItem(
			User user,
			Product product,
			String sizes,
			int quantity
		);
	public Cart findUserCart(User user);
	
}
