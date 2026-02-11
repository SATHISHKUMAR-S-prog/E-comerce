package com.project.Eccomerce.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Eccomerce.Model.Seller;
import com.project.Eccomerce.Model.Transaction;
import com.project.Eccomerce.Service.SellerService;
import com.project.Eccomerce.Service.TransactionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/transactions")
public class TransactionController {

	private final TransactionService transactionService;
	private final SellerService sellerService;
	
	@GetMapping("/seller")
	public ResponseEntity<List<Transaction>> getTransactionBySeller(@RequestHeader("Authorization") String jwt) throws Exception{
		Seller seller = sellerService.getSellerProfile(jwt);
		List<Transaction> transactions = transactionService.getTransactionBySellerId(seller);
		return ResponseEntity.ok(transactions);
	}
	
	@GetMapping
	public ResponseEntity<List<Transaction>> getAllTransaction(){
		List<Transaction> transactions = transactionService.getallTransaction();
		return ResponseEntity.ok(transactions);
	}
}
