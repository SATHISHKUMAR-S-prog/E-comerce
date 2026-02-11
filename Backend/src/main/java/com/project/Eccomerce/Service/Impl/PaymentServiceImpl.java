package com.project.Eccomerce.Service.Impl;

import java.util.Optional;
import java.util.Set;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.project.Eccomerce.Domain.OrderStatus;
import com.project.Eccomerce.Domain.PaymentMethod;
import com.project.Eccomerce.Domain.PaymentOrderStatus;
import com.project.Eccomerce.Domain.PaymentStatus;
import com.project.Eccomerce.Model.Order;
import com.project.Eccomerce.Model.PaymentOrder;
import com.project.Eccomerce.Model.User;
import com.project.Eccomerce.Repository.OrderRepository;
import com.project.Eccomerce.Repository.PaymentOrderRepository;
import com.project.Eccomerce.Service.PaymentService;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.checkout.SessionCreateParams.LineItem;
import com.stripe.param.checkout.SessionCreateParams.Mode;
import com.stripe.param.checkout.SessionCreateParams.PaymentMethodType;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
	
	private final PaymentOrderRepository paymentOrderRepository;
	private final OrderRepository orderRepository;

	@Value("${frontend.url}")
	private String frontend_url;
	private String apiKey = "apiKey";
	private String apiSecret = "apiSecret";
	private String stripeSecretKey = "stripeSecretKey";

	@Override
	public PaymentOrder createOrder(User user, Set<Order> orders, PaymentMethod paymentMethod) {
		Long amount = orders.stream().mapToLong(Order::getTotalSellingPrice).sum();
		PaymentOrder paymentOrder = new PaymentOrder();
		paymentOrder.setAmount(amount);
		paymentOrder.setUser(user);
		paymentOrder.setOrders(orders);
		paymentOrder.setPaymentMethod(paymentMethod);
		return paymentOrderRepository.save(paymentOrder);
	}

	@Override
	public PaymentOrder getPaymentOrderById(Long orderId) throws Exception {
		
		return paymentOrderRepository.findById(orderId).orElseThrow(() -> new Exception("payment order not found"));
	}

	@Override
	public PaymentOrder getPaymentOrderByPaymentId(String paymentId) throws Exception {
		PaymentOrder paymentOrder = paymentOrderRepository.findByPaymentLinkId(paymentId);
		if(paymentOrder == null) {
			throw new Exception("payment order not found with this payment link id");
		}
		return paymentOrder;
	}

	@Override
	public Boolean proceedPaymentOrder(PaymentOrder paymentOrder, String paymentId, String paymentLinkid) throws RazorpayException {
		if(paymentOrder.getStatus().equals(PaymentOrderStatus.PENDING)) {
			// cod is success in only testing purpose in real world it will be payment status failed
			if( paymentOrder.getPaymentMethod().equals(PaymentMethod.COD)) {
				Set<Order> orders = paymentOrder.getOrders();
				for(Order order : orders) {
					order.setPaymentMethod(PaymentMethod.COD);
					order.setPaymentStatus(PaymentStatus.PENDING);
					order.setOrderstatus(OrderStatus.PLACED);
					orderRepository.save(order);
				}
				paymentOrder.setStatus(PaymentOrderStatus.PENDING);
				paymentOrderRepository.save(paymentOrder);
				return true;
			}
			else {
				RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);
				
				Payment payment = razorpay.payments.fetch(paymentId);
				
				String status = payment.get("status");
				if(status.equals("captured") ) {
					Set<Order> orders = paymentOrder.getOrders();
					for(Order order : orders) {
						order.setPaymentMethod(PaymentMethod.RAZORPAY);
						order.setPaymentStatus(PaymentStatus.COMPLETED);
						orderRepository.save(order);
					}
					paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
					paymentOrderRepository.save(paymentOrder);
					return true;
				}
				paymentOrder.setStatus(PaymentOrderStatus.FAILED);
				paymentOrderRepository.save(paymentOrder);
				return false;
			}
		}
		
		return false;
	}

	@Override
	public PaymentLink createRazorPayPaymentLink(User user, Long amount, Long orderId) throws RazorpayException {
		amount = amount*100; // convert paise into rupee
		
		try {
			RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);
			
			JSONObject paymentLinkRequst = new JSONObject();
			paymentLinkRequst.put("amount", amount);
			paymentLinkRequst.put("currency", "INR");
			
			JSONObject customer = new JSONObject();
			customer.put("name",user.getFullname());
			customer.put("email", user.getEmail());
			paymentLinkRequst.put("customer",customer);
			
			JSONObject notify = new JSONObject();
			notify.put("email", true); // if you want to notify via sms give sms is true 
			paymentLinkRequst.put("notify", notify);
			
			paymentLinkRequst.put("callback-url", "http://localhost:3000/payment-success/" + orderId); // note you need to set the front end url 1st
			paymentLinkRequst.put("callback-method", "get");
			
			PaymentLink paymentLink = razorpay.paymentLink.create(paymentLinkRequst);
			
			String paymentLinkUrl = paymentLink.get("short_url");
			String paymentLinkId = paymentLink.get("id");
			
			return paymentLink;
			
		} catch (Exception e) {
			System.out.println(e.getMessage());
			throw new RazorpayException(e.getMessage());
		}
	
	}

	@Override
	public String createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException {
		String apiKey = stripeSecretKey;
		
		SessionCreateParams params = SessionCreateParams.builder()
				.addPaymentMethodType(PaymentMethodType.CARD) // here we can add all payment type also 
				.setMode(Mode.PAYMENT)
				.setSuccessUrl("http://localhost:3000/payment-success/" + orderId)
				.setCancelUrl("http://localhost:3000/payment-cancel")
				.addLineItem(LineItem.builder().setQuantity(1L)
						.setPriceData(SessionCreateParams.LineItem.PriceData.builder()
								.setCurrency("INR")
								.setUnitAmount(amount*100)
								.setProductData(LineItem.PriceData.ProductData
										.builder()
										.setName("Eccomerce website")
										.build()
								).build()
						).build()
					)
				.build();
		
		Session session = Session.create(params);
		return session.getUrl();
	}
	
	public String processCodOrder(Long orderId) throws Exception {
        String url = frontend_url+"/payment-success/"+orderId;
        return url;
    }

}
