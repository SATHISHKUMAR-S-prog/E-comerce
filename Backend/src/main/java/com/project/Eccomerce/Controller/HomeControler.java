package com.project.Eccomerce.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Eccomerce.Response.ApiResponse;

@RestController
public class HomeControler {
	
	@GetMapping
	public ApiResponse HomeControllerHandler() {
		ApiResponse apiResponse = new ApiResponse();
		apiResponse.setMessage("welcome everyOne");
		return apiResponse;
	}
}
