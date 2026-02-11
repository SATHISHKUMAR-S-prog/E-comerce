package com.project.Eccomerce.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.Eccomerce.Domain.AccountStatus;
import com.project.Eccomerce.Model.Seller;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {

	Seller findByEmail(String email);
	List<Seller> findByAccountStatus(AccountStatus status);
}
