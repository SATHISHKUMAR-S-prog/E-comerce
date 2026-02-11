package com.project.Eccomerce.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.Eccomerce.Model.Order;
import com.project.Eccomerce.Model.PaymentOrder;
import com.project.Eccomerce.Model.Seller;
import com.project.Eccomerce.Model.SellerReport;
import com.project.Eccomerce.Model.User;
import com.project.Eccomerce.Response.ApiResponse;
import com.project.Eccomerce.Response.PaymentLinkResponse;
import com.project.Eccomerce.Service.PaymentService;
import com.project.Eccomerce.Service.SellerReportService;
import com.project.Eccomerce.Service.SellerService;
import com.project.Eccomerce.Service.TransactionService;
import com.project.Eccomerce.Service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payment")
public class PaymentController {

	private final PaymentService paymentService;
	private final UserService userService;
	private final SellerService sellerService;
	private final SellerReportService sellerReportService;
	private final TransactionService transactionService;
	
	@GetMapping("{paymentId}")
	public ResponseEntity<ApiResponse> paymentSuccessfulHandler(@PathVariable String paymentId,
			@RequestParam String paymentLinkId,
			@RequestHeader("Authorization") String jwt) throws Exception{
		
		User user = userService.findUserByJwtToken(jwt);
//		System.out.println(user + "payment id - - " + paymentId + "link id - - " + paymentLinkId);
		PaymentLinkResponse paymentLinkResponse;
		
		PaymentOrder paymentOrder = paymentService.getPaymentOrderByPaymentId(paymentId);
		
		boolean paymentSuccess = paymentService.proceedPaymentOrder(paymentOrder, paymentId, paymentLinkId);
		
		if(paymentSuccess) {
			for(Order order : paymentOrder.getOrders()) {
				transactionService.createTransaction(order);
				Seller seller = sellerService.getSellerById(order.getSellerId());
				SellerReport report =sellerReportService.getSellerReport(seller);
				report.setTotalOrders(report.getTotalOrders() + 1);
				report.setTotalEarnings(report.getTotalEarnings() + order.getTotalSellingPrice());
				report.setTotalSales(report.getTotalSales() + order.getOrderItems().size());
				sellerReportService.updateSellerReport(report);
			}
		}
		
		ApiResponse res = new ApiResponse();
		res.setMessage("payment success");
		
		return new ResponseEntity<>(res,HttpStatus.CREATED);
	}
}
