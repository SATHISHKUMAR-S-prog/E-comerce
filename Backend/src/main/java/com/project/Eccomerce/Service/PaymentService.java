package com.project.Eccomerce.Service;

import java.util.Set;

import com.project.Eccomerce.Domain.PaymentMethod;
import com.project.Eccomerce.Model.Order;
import com.project.Eccomerce.Model.PaymentOrder;
import com.project.Eccomerce.Model.User;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;

public interface PaymentService {

	PaymentOrder createOrder(User user,Set<Order> orders,PaymentMethod paymentMethod);
	PaymentOrder getPaymentOrderById(Long orderId) throws Exception;
	PaymentOrder getPaymentOrderByPaymentId(String paymentId) throws Exception;
	Boolean proceedPaymentOrder(PaymentOrder paymentOrder,String paymentId,String paymentLinkid) throws RazorpayException;
	PaymentLink createRazorPayPaymentLink(User user,Long amount,Long orderId) throws RazorpayException;
	String createStripePaymentLink(User user,Long amount,Long orderId) throws StripeException;
	String processCodOrder(Long orderId) throws Exception;
}
