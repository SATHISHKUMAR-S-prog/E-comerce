package com.project.Eccomerce.Response;

import lombok.Data;

@Data
public class PaymentLinkResponse {

	private String payment_link_url;
	private String payment_link_id;
}
