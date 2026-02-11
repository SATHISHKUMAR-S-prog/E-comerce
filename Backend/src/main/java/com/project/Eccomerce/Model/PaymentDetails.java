package com.project.Eccomerce.Model;

import com.project.Eccomerce.Domain.PaymentStatus;

import lombok.Data;

@Data
public class PaymentDetails {
	
	private String paymentId;
	private String raxorpayPaymentLinkId;
	private String razorpayPaymentLinkReferenceId;
	private String razorpayPaymentLinkStatus;
	private String razorpaypaymentIdZWSP;
	private PaymentStatus status;
}
