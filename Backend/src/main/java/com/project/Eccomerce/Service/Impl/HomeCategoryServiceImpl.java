package com.project.Eccomerce.Service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.Eccomerce.Model.HomeCategory;
import com.project.Eccomerce.Repository.HomeCategoryRepository;
import com.project.Eccomerce.Service.HomeCategoryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HomeCategoryServiceImpl implements HomeCategoryService {

	private final HomeCategoryRepository homeCategoryRepository;
	
	@Override
	public HomeCategory createCategore(HomeCategory homeCategory) {
		
		return homeCategoryRepository.save(homeCategory);
	}

	@Override
	public List<HomeCategory> createCategories(List<HomeCategory> homeCategories) {
		if(homeCategoryRepository.findAll().isEmpty()) {
			return homeCategoryRepository.saveAll(homeCategories);
		}
		return homeCategoryRepository.findAll();
	}

	@Override
	public HomeCategory updateHomeCategory(Long id, HomeCategory category) throws Exception {
		HomeCategory existingCategory = homeCategoryRepository.findById(id).orElseThrow(
				() -> new Exception("Category not found"));
		if(existingCategory.getImages() != null) {
			existingCategory.setImages(category.getImages());
		}
		if(existingCategory.getCategoryId() != null) {
			existingCategory.setCategoryId(category.getCategoryId());
		}
		return homeCategoryRepository.save(existingCategory);
	}

	@Override
	public List<HomeCategory> getAllHomeCategories() {
		
		return homeCategoryRepository.findAll();
	}

}
