package com.project.Eccomerce.Model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class CartItem {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@ManyToOne // one cart have many cart item
	@JsonIgnore 
	// it can't fetch by the front end
	private Cart cart;
	
	@ManyToOne
	private Product product;
	
	private String sizes;
	
	private int quantity = 1; // this is a minimum quantity
	
	private Integer mrpPrice ;
	
	private Integer sellingPrice;
	
	private Long userId;
}
