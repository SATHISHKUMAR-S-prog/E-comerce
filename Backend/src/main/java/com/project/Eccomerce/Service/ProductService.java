package com.project.Eccomerce.Service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.project.Eccomerce.Exception.ProductException;
import com.project.Eccomerce.Model.Product;
import com.project.Eccomerce.Model.Seller;
import com.project.Eccomerce.Request.createProductRequest;

public interface ProductService {

	public Product createProduct(createProductRequest req, Seller seller);
	public void deleteProduct(Long productId) throws ProductException;
	public Product updateProduct(Long productId,Product product) throws ProductException;
	Product findByProductId(Long productId) throws ProductException;
	List<Product> searchProduct(String query);
	public Page<Product> getAllProducts(
				String category,
				String color,
				String brand,
				String sizes,
				Integer minPrice,
				Integer maxPrice,
				Integer minDiscount,
				String sort,
				String stock,
				Integer pageNumber
			);
	List<Product> getProductsBySellerId(Long sellerId);
}
