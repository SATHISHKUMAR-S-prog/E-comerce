package com.project.Eccomerce.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.Eccomerce.Model.PaymentOrder;


public interface PaymentOrderRepository extends JpaRepository<PaymentOrder, Long> {

	PaymentOrder findByPaymentLinkId(String paymentLinkId);
}
