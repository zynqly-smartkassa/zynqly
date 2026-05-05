package com.zynqly.backend.common.exception;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiError {

	private int status;
	private String message;
	private List<FieldError> errors;


	@Builder
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	public static class FieldError {

		private String field;
		private String message;
		

	}

}
