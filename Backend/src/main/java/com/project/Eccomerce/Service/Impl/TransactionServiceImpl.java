package com.project.Eccomerce.Service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.Eccomerce.Model.Order;
import com.project.Eccomerce.Model.Seller;
import com.project.Eccomerce.Model.Transaction;
import com.project.Eccomerce.Repository.SellerRepository;
import com.project.Eccomerce.Repository.TransactionRepository;
import com.project.Eccomerce.Service.TransactionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {
	
	private final TransactionRepository transactionRepository;
	private final SellerRepository sellerRepository;

	@Override
	public Transaction createTransaction(Order order) {
		Seller seller = sellerRepository.findById(order.getSellerId()).get();
		
		Transaction transaction = new Transaction();
		transaction.setSeller(seller);
		transaction.setCustomer(order.getUser());
		transaction.setOrder(order);
		
		return transactionRepository.save(transaction);
	}

	@Override
	public List<Transaction> getTransactionBySellerId(Seller seller) {
		
		return transactionRepository.findBySellerId(seller.getId());
	}

	@Override
	public List<Transaction> getallTransaction() {
		
		return transactionRepository.findAll();
	}

}
