package com.project.Eccomerce.Exception;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorDeatils {

	private String error;
	private String details;
	private LocalDateTime timeStamp;
}
