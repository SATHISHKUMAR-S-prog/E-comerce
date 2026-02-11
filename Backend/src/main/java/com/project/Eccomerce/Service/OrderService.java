package com.project.Eccomerce.Service;

import java.util.List;
import java.util.Set;

import com.project.Eccomerce.Domain.OrderStatus;
import com.project.Eccomerce.Model.Address;
import com.project.Eccomerce.Model.Cart;
import com.project.Eccomerce.Model.Order;
import com.project.Eccomerce.Model.OrderItem;
import com.project.Eccomerce.Model.User;

public interface OrderService {

	Set<Order> createOrder(User user, Address shippingAddress, Cart cart);
	Order findOrderById(Long id) throws Exception;
	List<Order> userOrderHistory(Long userId);
	List<Order> sellerOrder(Long sellerId);
	Order updateOrderStatus(Long orderId, OrderStatus orderStatus ) throws Exception;
	Order cancelOrder(Long orderId, User user) throws Exception;
	OrderItem getOrderItemById(Long id) throws Exception;
}
