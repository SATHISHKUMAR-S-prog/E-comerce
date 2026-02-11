package com.project.Eccomerce.Model;

import java.util.List;

import lombok.Data;

@Data
public class Home {

	private List<HomeCategory> gird;
	
	private List<HomeCategory> shopByCategory;
	
	private List<HomeCategory> electricCategory;
	
	private List<HomeCategory> dealsCategory;
	
	private List<Deals> deals;
}
