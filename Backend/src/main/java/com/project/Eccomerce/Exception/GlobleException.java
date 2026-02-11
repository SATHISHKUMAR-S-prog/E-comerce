package com.project.Eccomerce.Exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobleException {

	@ExceptionHandler(SellerException.class)
	public ResponseEntity<ErrorDeatils> sellerExceptionHandler(SellerException se ,WebRequest req){
		ErrorDeatils errorDeatils = new ErrorDeatils();
		
		errorDeatils.setError(se.getMessage());
		errorDeatils.setDetails(req.getDescription(false));
		errorDeatils.setTimeStamp(LocalDateTime.now());
		
		return new ResponseEntity<ErrorDeatils>(errorDeatils,HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(ProductException.class)
	public ResponseEntity<ErrorDeatils> productExceptionHandler(ProductException se ,WebRequest req){
		ErrorDeatils errorDeatils = new ErrorDeatils();
		
		errorDeatils.setError(se.getMessage());
		errorDeatils.setDetails(req.getDescription(false));
		errorDeatils.setTimeStamp(LocalDateTime.now());
		
		return new ResponseEntity<ErrorDeatils>(errorDeatils,HttpStatus.BAD_REQUEST);
	}
}
