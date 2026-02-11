package com.project.Eccomerce.Service.Impl;

import org.springframework.stereotype.Service;

import com.project.Eccomerce.Model.Seller;
import com.project.Eccomerce.Model.SellerReport;
import com.project.Eccomerce.Repository.SellerReportRepository;
import com.project.Eccomerce.Service.SellerReportService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SellerReportServiceImpl implements SellerReportService {

	private final SellerReportRepository sellerReportRepository;
	
	@Override
	public SellerReport getSellerReport(Seller seller) {
		SellerReport sellerReport = sellerReportRepository.findBySellerId(seller.getId());
		if(sellerReport == null) {
			SellerReport newReport = new SellerReport();
			newReport.setSeller(seller);
			return sellerReportRepository.save(newReport);
		}
		return sellerReport;
	}

	@Override
	public SellerReport updateSellerReport(SellerReport sellerReport) {
		
		return sellerReportRepository.save(sellerReport);
	}

}
