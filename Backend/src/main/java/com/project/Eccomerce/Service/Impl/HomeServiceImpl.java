package com.project.Eccomerce.Service.Impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.project.Eccomerce.Domain.HomeCategorySection;
import com.project.Eccomerce.Model.Deals;
import com.project.Eccomerce.Model.Home;
import com.project.Eccomerce.Model.HomeCategory;
import com.project.Eccomerce.Repository.DealsRepository;
import com.project.Eccomerce.Repository.HomeCategoryRepository;
import com.project.Eccomerce.Service.HomeService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService {
	
	private final DealsRepository dealsRepository;
	private final HomeCategoryRepository homeCategoryRepository;
	
	@Override
	public Home createHomePageData(List<HomeCategory> allCategories) {
		
		List<HomeCategory> gridCategories = allCategories.stream()
				.filter(category -> category.getSection() == HomeCategorySection.GRID)
				.collect(Collectors.toList());
		
		List<HomeCategory> shopByCategories = allCategories.stream()
				.filter(category -> category.getSection() == HomeCategorySection.SHOP_BY_CATEGORIES)
				.collect(Collectors.toList());
		
		List<HomeCategory> electricCategories = allCategories.stream()
				.filter(category -> category.getSection() == HomeCategorySection.ELECTRONICS_CATEGORIES)
				.collect(Collectors.toList());
		
		List<HomeCategory> dealsCategories = allCategories.stream()
				.filter(category -> category.getSection() == HomeCategorySection.DEALS)
				.toList();
		
		List<Deals> createDeals = new ArrayList<>();
		
		if(dealsRepository.findAll().isEmpty()) {
			List<Deals> deals = allCategories.stream()
					.filter(category -> category.getSection() == HomeCategorySection.DEALS)
					.map(category -> new Deals(null, 10, category))
					.collect(Collectors.toList());
			
			createDeals = dealsRepository.saveAll(deals);
		}else {
			createDeals = dealsRepository.findAll();
			
		}
		
		
		Home home = new Home();
		home.setGird(gridCategories);
		home.setShopByCategory(shopByCategories);
		home.setDeals(createDeals);
		home.setElectricCategory(electricCategories);
		home.setDealsCategory(dealsCategories);
		
		return home;
	}

	

	

}
