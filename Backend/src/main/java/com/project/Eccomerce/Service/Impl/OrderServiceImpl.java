package com.project.Eccomerce.Service.Impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.Eccomerce.Domain.OrderStatus;
import com.project.Eccomerce.Domain.PaymentMethod;
import com.project.Eccomerce.Domain.PaymentOrderStatus;
import com.project.Eccomerce.Domain.PaymentStatus;
import com.project.Eccomerce.Model.Address;
import com.project.Eccomerce.Model.Cart;
import com.project.Eccomerce.Model.CartItem;
import com.project.Eccomerce.Model.Order;
import com.project.Eccomerce.Model.OrderItem;
import com.project.Eccomerce.Model.PaymentOrder;
import com.project.Eccomerce.Model.User;
import com.project.Eccomerce.Repository.AddressRepository;
import com.project.Eccomerce.Repository.OrderItemRepository;
import com.project.Eccomerce.Repository.OrderRepository;
import com.project.Eccomerce.Repository.PaymentOrderRepository;
import com.project.Eccomerce.Service.OrderService;
import com.project.Eccomerce.Service.PaymentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@RequestMapping
public class OrderServiceImpl implements OrderService {
	
	private final OrderRepository orderRepository;
	private final AddressRepository addressRepository;
	private final OrderItemRepository orderItemRepository;
	private final PaymentService paymentService;
	private final PaymentOrderRepository paymentOrderRepository;

	@Override
	public Set<Order> createOrder(User user, Address shippingAddress, Cart cart) {
		if(!user.getAddress().contains(shippingAddress)) {
			user.getAddress().add(shippingAddress);
		}
		
		Address address = addressRepository.save(shippingAddress);
		
//		brand 1 => 4 shirt
//		brand 2 => 3 pant
//		brand 3 => 2 t-shirt the user order many items from different seller in one order 
//		 so we map each seller in cart and then make oder for each seller
		
		Map<Long, List<CartItem>> itemsBySeller = cart.getCartItem().stream()
					.collect(Collectors.groupingBy( item -> item.getProduct().getSeller().getId()));
		
		Set<Order> orders = new HashSet<>();
		
		for(Map.Entry<Long, List<CartItem>> entry:itemsBySeller.entrySet()) {
			Long sellerId = entry.getKey();
			List<CartItem> items = entry.getValue();
			
			int totalOrderPrice = items.stream().mapToInt(
						CartItem::getSellingPrice
					).sum();
			int totalOrderMrpPrice = items.stream().mapToInt(
					CartItem::getMrpPrice
				).sum();
			int totalItems = items.stream().mapToInt(
					CartItem::getQuantity
				).sum();
		
			Order createdOrder = new Order();
			createdOrder.setUser(user);
			createdOrder.setSellerId(sellerId);
			createdOrder.setTotalMrpPrice(totalOrderMrpPrice);
			createdOrder.setTotalSellingPrice(totalOrderPrice);
			createdOrder.setTotalItem(totalItems);
			createdOrder.setShippingAddress(address);
			createdOrder.setOrderstatus(OrderStatus.CONFIRMED);
			createdOrder.getPaymentDetails().setStatus(PaymentStatus.PENDING);
			
			Order savedOrder = orderRepository.save(createdOrder);
			orders.add(savedOrder);
			
			List<OrderItem> orderItems = new ArrayList<>();
			
			for( CartItem item : items) {
				OrderItem orderItem = new OrderItem();
				orderItem.setOrder(savedOrder);
				orderItem.setMrpPrice(item.getMrpPrice());
				orderItem.setQuantity(item.getQuantity());
				orderItem.setProduct(item.getProduct());
				orderItem.setSize(item.getSizes());
				orderItem.setSellingPrice(item.getSellingPrice());
				orderItem.setUserId(item.getUserId());
				
				savedOrder.getOrderItems().add(orderItem);
				
				OrderItem savedOrderItems = orderItemRepository.save(orderItem);
				orderItems.add(savedOrderItems);
			}
		}
		return orders;
	}

	@Override
	public Order findOrderById(Long id) throws Exception {
		return orderRepository.findById(id).orElseThrow(()-> new Exception("order not found..  "));
	}

	@Override
	public List<Order> userOrderHistory(Long userId) {
		
		return orderRepository.findByUserId(userId);
	}

	@Override
	public List<Order> sellerOrder(Long sellerId) {
		// TODO Auto-generated method stub
		return orderRepository.findBySellerId(sellerId);
	}

	@Override
	public Order updateOrderStatus(Long orderId, OrderStatus orderStatus) throws Exception {
		Order order = findOrderById(orderId);
		if(order.getPaymentMethod().equals(PaymentMethod.COD) && orderStatus.equals(OrderStatus.DELIVERED)) {
			order.setPaymentStatus(PaymentStatus.COMPLETED);
			PaymentOrder paymentOrder = paymentService.getPaymentOrderById(orderId);
			paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
			paymentOrderRepository.save(paymentOrder);
		}
		order.setOrderstatus(orderStatus);
		return orderRepository.save(order);
	}

	@Override
	public Order cancelOrder(Long orderId, User user) throws Exception {
		Order order = findOrderById(orderId);
		
		if(!user.getId().equals(order.getUser().getId())) {
			throw new Exception("you can't access this order...");
		}
		order.setOrderstatus(OrderStatus.CANCELLED);
		return orderRepository.save(order);
	}

	@Override
	public OrderItem getOrderItemById(Long id) throws Exception {
	
		return orderItemRepository.findById(id).orElseThrow(()-> new Exception("order item not exist..."));
	}
	
}
