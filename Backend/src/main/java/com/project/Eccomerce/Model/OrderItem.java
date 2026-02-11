package com.project.Eccomerce.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@JsonIgnore
	@ManyToOne  // at one order have many items
	private Order order;
	
	
	@ManyToOne  // many items are same product (one product in multiple quantities)
	private Product product;
	
	private String size;
	
	private int quantity;
	
	private Integer mrpPrice;
	
	private Integer  sellingPrice;
	
	private Long userId;
}
