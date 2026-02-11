package com.project.Eccomerce.Service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.Eccomerce.Model.Deals;
import com.project.Eccomerce.Model.HomeCategory;
import com.project.Eccomerce.Repository.DealsRepository;
import com.project.Eccomerce.Repository.HomeCategoryRepository;
import com.project.Eccomerce.Service.DealsService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DealsServiceImpl implements DealsService {

	private final DealsRepository dealsRepository;
	private final HomeCategoryRepository homeCategoryRepository;
	
	@Override
	public List<Deals> getAllDeals() {
		
		return dealsRepository.findAll();
	}

	@Override
	public Deals createDeal(Deals deals) {
		HomeCategory category = homeCategoryRepository.findById(deals.getCategory().getId()).orElse(null);
		Deals newDeals = dealsRepository.findByCategoryId(category.getId());
		if(newDeals == null) {
			newDeals.setCategory(category);
			newDeals.setDiscount(deals.getDiscount());
		} else {
			
			newDeals.setDiscount(deals.getDiscount());
		}
		return dealsRepository.save(newDeals);
	}

	@Override
	public Deals updateDeal(Deals deals, Long id) throws Exception {
		Deals existingDeals = dealsRepository.findById(id).orElseThrow(() -> new Exception("Deals not found"));
		HomeCategory category = homeCategoryRepository.findById(deals.getCategory().getId()).orElse(null);
		
		if( existingDeals != null) {
			if(deals.getDiscount() != null) {
				existingDeals.setDiscount(deals.getDiscount());
			}
			if(deals.getCategory() != null) {
				existingDeals.setCategory(category);
			}
			return dealsRepository.save(existingDeals);
		}
		throw new Exception("deals not found");
	}

	@Override
	public void deleteDeal(Long id) throws Exception {
		Deals deals = dealsRepository.findById(id).orElseThrow(() -> new Exception("Deals not found"));
		dealsRepository.delete(deals);

	}

}
