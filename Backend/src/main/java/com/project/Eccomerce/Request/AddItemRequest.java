package com.project.Eccomerce.Request;

import lombok.Data;

@Data
public class AddItemRequest {

	private String sizes;
	private int quantity;
	private Long productId;
}
