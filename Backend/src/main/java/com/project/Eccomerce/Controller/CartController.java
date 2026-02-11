package com.project.Eccomerce.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Eccomerce.Model.Cart;
import com.project.Eccomerce.Model.CartItem;
import com.project.Eccomerce.Model.Product;
import com.project.Eccomerce.Model.User;
import com.project.Eccomerce.Request.AddItemRequest;
import com.project.Eccomerce.Response.ApiResponse;
import com.project.Eccomerce.Service.CartItemService;
import com.project.Eccomerce.Service.CartService;
import com.project.Eccomerce.Service.ProductService;
import com.project.Eccomerce.Service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cart")
public class CartController {

	private final CartService cartService;
	private final CartItemService cartItemService;
	private final UserService userService;
	private final ProductService productService;
	
	@GetMapping
	public ResponseEntity<Cart> findUserCartHandler(@RequestHeader("Authorization") String jwt) throws Exception{
		User user = userService.findUserByJwtToken(jwt);
	
		Cart cart = cartService.findUserCart(user);
		return ResponseEntity.ok(cart); 
	}
	
	@PutMapping("/add")
	public ResponseEntity<CartItem> addItemToCart(@RequestBody AddItemRequest req,
			@RequestHeader("Authorization") String jwt) throws Exception{
	
		
		User user = userService.findUserByJwtToken(jwt);
		Product product = productService.findByProductId(req.getProductId());
		CartItem item = cartService.addCartItem(user, product, req.getSizes(), req.getQuantity());
		ApiResponse res = new ApiResponse();
		res.setMessage("Item Added to cart Sucesssfully");
		 return new ResponseEntity<>(item,HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping("/item/{cartItemId}")
	public ResponseEntity<ApiResponse> deletecartItemHandler(@PathVariable Long cartItemId,
			@RequestHeader("Authorization") String jwt) throws Exception{
		
		User user = userService.findUserByJwtToken(jwt);
		cartItemService.removeCartItem(user.getId(), cartItemId);
		ApiResponse res = new ApiResponse();
		res.setMessage("Item remove from cart");
		return new ResponseEntity<ApiResponse>(res,HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/item/{cartItemId}")
	public ResponseEntity<CartItem> updateCartItemHandler(@PathVariable Long cartItemId,
			@RequestBody CartItem cartItem,
			@RequestHeader("Authorization") String jwt) throws Exception{
		
		User user = userService.findUserByJwtToken(jwt);
		
		CartItem updateCartItem = null;
		
		if(cartItem.getQuantity() > 0) {
			updateCartItem = cartItemService.updateCartItem(user.getId(), cartItemId, cartItem);
		}
		
		return new ResponseEntity<>(updateCartItem,HttpStatus.ACCEPTED);
	}
}
