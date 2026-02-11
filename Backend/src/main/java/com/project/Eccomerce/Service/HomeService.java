package com.project.Eccomerce.Service;

import java.util.List;

import com.project.Eccomerce.Model.Home;
import com.project.Eccomerce.Model.HomeCategory;

public interface HomeService {

	Home createHomePageData(List<HomeCategory> allCategories);
}
