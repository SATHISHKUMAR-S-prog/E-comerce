package com.project.Eccomerce.Service;

import java.util.List;

import com.project.Eccomerce.Model.Deals;

public interface DealsService {

	List<Deals> getAllDeals();
	Deals createDeal(Deals deals);
	Deals updateDeal(Deals deals, Long id) throws Exception;
	void deleteDeal(Long id) throws Exception;
}
