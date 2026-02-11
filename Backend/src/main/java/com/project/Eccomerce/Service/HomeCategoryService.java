package com.project.Eccomerce.Service;

import java.util.List;

import com.project.Eccomerce.Model.HomeCategory;

public interface HomeCategoryService {

	HomeCategory createCategore(HomeCategory homeCategory);
	List<HomeCategory> createCategories(List<HomeCategory> homeCategories);
	HomeCategory updateHomeCategory(Long id, HomeCategory category) throws Exception;
	List<HomeCategory> getAllHomeCategories();
}
