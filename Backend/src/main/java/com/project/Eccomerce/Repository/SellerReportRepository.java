package com.project.Eccomerce.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.Eccomerce.Model.SellerReport;

public interface SellerReportRepository extends JpaRepository<SellerReport, Long> {
	
	SellerReport findBySellerId(Long sellerId);
}
