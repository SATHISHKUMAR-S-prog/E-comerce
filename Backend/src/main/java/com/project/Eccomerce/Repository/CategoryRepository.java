package com.project.Eccomerce.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.Eccomerce.Model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

	Category findByCategoryId(String categoryId);
}
