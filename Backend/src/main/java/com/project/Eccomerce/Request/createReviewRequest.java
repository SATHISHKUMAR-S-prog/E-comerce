package com.project.Eccomerce.Request;

import java.util.List;

import lombok.Data;

@Data
public class createReviewRequest {

	private String reviewtext;
	private double reviewRating;
	private List<String> productImages;
}
