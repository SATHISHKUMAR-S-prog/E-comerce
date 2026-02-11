package com.project.Eccomerce.Model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.project.Eccomerce.Domain.OrderStatus;
import com.project.Eccomerce.Domain.PaymentMethod;
import com.project.Eccomerce.Domain.PaymentStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String orderId;
	
	@ManyToOne
	private User user;
	
	private Long sellerId;
	
	@OneToMany(mappedBy = "order",cascade = CascadeType.ALL,orphanRemoval = true)    // at one order have many items
	private List<OrderItem> orderItems = new ArrayList<>();
	
	@ManyToOne
	private Address shippingAddress;
	
	@Embedded
	private PaymentDetails paymentDetails = new PaymentDetails();
	
	private double totalMrpPrice;
	
	private Integer totalSellingPrice;
	
	private Integer discount;
	
	private OrderStatus orderstatus;
	
	private int totalItem;
	
	private PaymentStatus paymentStatus = PaymentStatus.PENDING;
	
	private LocalDateTime orderDate = LocalDateTime.now();
	
	private LocalDateTime deliveryDate = orderDate.plusDays(7);
	
	private PaymentMethod paymentMethod = PaymentMethod.COD;
}
