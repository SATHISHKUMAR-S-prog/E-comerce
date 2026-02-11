package com.project.Eccomerce.Service;

import java.util.List;

import com.project.Eccomerce.Model.Order;
import com.project.Eccomerce.Model.Seller;
import com.project.Eccomerce.Model.Transaction;

public interface TransactionService {

	Transaction createTransaction(Order order);
	List<Transaction> getTransactionBySellerId(Seller seller);
	List<Transaction> getallTransaction();
}
