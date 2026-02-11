package com.project.Eccomerce.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Eccomerce.Model.Deals;
import com.project.Eccomerce.Response.ApiResponse;
import com.project.Eccomerce.Service.DealsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/deals")
public class DealsController {

	private final DealsService dealsService;
	
	@PostMapping
	public ResponseEntity<Deals> createDeals(@RequestBody Deals deals){
		Deals createdDeals = dealsService.createDeal(deals);
		return new ResponseEntity<Deals>(createdDeals,HttpStatus.CREATED);
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<Deals> updateDeals(@PathVariable Long id,
			@RequestBody Deals deals) throws Exception{
		Deals updatedDeals = dealsService.updateDeal(deals, id);
		return ResponseEntity.ok(updatedDeals);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse> deleteDeals(@PathVariable Long id) throws Exception{
		dealsService.deleteDeal(id);
		
		ApiResponse res = new ApiResponse();
		res.setMessage("Deals deleted");
		return ResponseEntity.ok(res);
	}
	
	@GetMapping
	public ResponseEntity<List<Deals>> getAllDeals(){
		List<Deals> deals = dealsService.getAllDeals();
		return new ResponseEntity<List<Deals>>(deals,HttpStatus.ACCEPTED);
	}
}
