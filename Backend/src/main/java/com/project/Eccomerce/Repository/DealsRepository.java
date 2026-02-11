package com.project.Eccomerce.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.Eccomerce.Model.Deals;

public interface DealsRepository extends JpaRepository<Deals, Long> {

	Deals findByCategoryId(Long id);
}
