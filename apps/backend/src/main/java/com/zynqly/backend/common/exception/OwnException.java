package com.zynqly.backend.common.exception;

import java.util.List;

import lombok.Getter;

@Getter
public class OwnException extends RuntimeException {

	private final List<ApiError.FieldError> errors; 

	public OwnException(List<ApiError.FieldError> errors) {
		super("There " + (errors.size() == 1 ? "is " : "are ") + errors.size() + (errors.size() == 1 ? " error" : " errors"));
		this.errors = errors;
	}

}

