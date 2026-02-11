package com.project.Eccomerce.Controller;

import java.util.List;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.Eccomerce.Domain.PaymentMethod;
import com.project.Eccomerce.Model.Address;
import com.project.Eccomerce.Model.Cart;
import com.project.Eccomerce.Model.Order;
import com.project.Eccomerce.Model.OrderItem;
import com.project.Eccomerce.Model.PaymentOrder;
import com.project.Eccomerce.Model.Seller;
import com.project.Eccomerce.Model.SellerReport;
import com.project.Eccomerce.Model.User;
import com.project.Eccomerce.Repository.PaymentOrderRepository;
import com.project.Eccomerce.Response.PaymentLinkResponse;
import com.project.Eccomerce.Service.CartService;
import com.project.Eccomerce.Service.OrderService;
import com.project.Eccomerce.Service.PaymentService;
import com.project.Eccomerce.Service.SellerReportService;
import com.project.Eccomerce.Service.SellerService;
import com.project.Eccomerce.Service.UserService;
import com.razorpay.PaymentLink;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {

	private final OrderService orderService;
	private final UserService userService;
	private final CartService cartService;
	private final SellerService sellerService;
	private final SellerReportService sellerReportService;
	private final PaymentService paymentService;
	private final PaymentOrderRepository paymentOrderRepository;
	
	@PostMapping
	public ResponseEntity<PaymentLinkResponse> createOrderHandler(@RequestBody Address shippingAddress,
			@RequestParam PaymentMethod paymentMethod,
			@RequestHeader("Authorization") String jwt) throws Exception{
		
		User user = userService.findUserByJwtToken(jwt);
		Cart cart = cartService.findUserCart(user);
		Set<Order> orders = orderService.createOrder(user, shippingAddress, cart);
		PaymentOrder paymentOrder = paymentService.createOrder(user, orders,paymentMethod);
		
		PaymentLinkResponse res = new PaymentLinkResponse();
		
		if(paymentMethod.equals(PaymentMethod.RAZORPAY)) {
			PaymentLink payment = paymentService.createRazorPayPaymentLink(user,
										paymentOrder.getAmount(),
										paymentOrder.getId());
			String paymentUrl = payment.get("short_url");
			String paymentUrlId = payment.get("id");
		
			res.setPayment_link_url(paymentUrl);
			
			paymentOrder.setPaymentLinkId(paymentUrlId);
			paymentOrderRepository.save(paymentOrder);
		} else if(paymentMethod.equals(PaymentMethod.COD)) {
			String paymentUrl = paymentService.processCodOrder(paymentOrder.getId());
			
			String paymentUrlId = (paymentOrder.getId()).toString();
			paymentOrder.setPaymentLinkId(paymentUrlId);
			paymentOrderRepository.save(paymentOrder);
			res.setPayment_link_url(paymentUrl+"?gateway=cod&cod_payment_id="+ paymentOrder.getId() + "&cod_payment_link_id="+ paymentUrlId);
		}
		else {
			String paymentUrl = paymentService.createStripePaymentLink(user,
									paymentOrder.getAmount(),
									paymentOrder.getId());
			res.setPayment_link_url(paymentUrl);
			
		}
		
		return new ResponseEntity<>(res,HttpStatus.OK);
	}
	
	@GetMapping("/user")
	public ResponseEntity<List<Order>> useerDetailsHistoryHandler(
			@RequestHeader("Authorization") String jwt) throws Exception{
		
		User user = userService.findUserByJwtToken(jwt);
		List<Order> orders = orderService.userOrderHistory(user.getId());
		return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/{orderId}")
	public ResponseEntity<Order> getOrderByOrderId(@PathVariable Long orderId, @RequestHeader("Authorization") String jwt) throws Exception{
		User user = userService.findUserByJwtToken(jwt);
		Order order = orderService.findOrderById(orderId);
		return ResponseEntity.ok(order);
	}
	
	@GetMapping("/item/{orderItemId}")
	public ResponseEntity<OrderItem> getOrderItemById(@PathVariable Long orderItemId,
			@RequestHeader("Authorization") String jwt) throws Exception{
		
		User user = userService.findUserByJwtToken(jwt);
		OrderItem orderItem = orderService.getOrderItemById(orderItemId);
		return new ResponseEntity<>(orderItem,HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/{orderId}/cancel")
	public ResponseEntity<Order> cancelOrder(@PathVariable Long orderId,
			@RequestHeader("Authorization") String jwt) throws Exception{
		
		User user = userService.findUserByJwtToken(jwt);
		
		Order order = orderService.cancelOrder(orderId, user);
		
		Seller seller = sellerService.getSellerById(order.getSellerId());
		SellerReport report = sellerReportService.getSellerReport(seller);
		
		report.setCancelledOrders(report.getCancelledOrders() + 1);
		report.setTotalRefunds(report.getTotalRefunds() + order.getTotalSellingPrice());
		sellerReportService.updateSellerReport(report);
		
		return ResponseEntity.ok(order);
	}
	
}
