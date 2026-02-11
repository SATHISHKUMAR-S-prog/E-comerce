package com.project.Eccomerce.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.Eccomerce.Model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

	List<Transaction> findBySellerId(Long sellerId);
}
