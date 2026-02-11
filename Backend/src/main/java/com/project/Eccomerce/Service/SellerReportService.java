package com.project.Eccomerce.Service;

import com.project.Eccomerce.Model.Seller;
import com.project.Eccomerce.Model.SellerReport;

public interface SellerReportService {

	SellerReport getSellerReport(Seller seller);
	SellerReport updateSellerReport(SellerReport sellerReport);
}
