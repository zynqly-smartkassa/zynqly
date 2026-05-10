package com.zynqly.backend.common.exception;

import com.zynqly.backend.common.domain.dtos.factory.ErrorResponseFactory;
import com.zynqly.backend.common.domain.dtos.ErrorResponse;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NonNull;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<@NonNull ErrorResponse> handleNotFound(EntityNotFoundException ex,
            HttpServletRequest request) {
        return ResponseEntity.status(404).body(
                ErrorResponseFactory.NotFoundErrorResponse(ex.getMessage(), request.getRequestURI()));
    }

    @ExceptionHandler(OwnException.class)
    public ResponseEntity<ApiError> handleOwnException(OwnException ex) {

        ApiError error = ApiError.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .message(ex.getMessage())
                .errors(ex.getErrors())
                .build();

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);

    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiError> handleAuthenticationException(AuthenticationException ex) {
        ApiError error = ApiError.builder()
                .status(HttpStatus.UNAUTHORIZED.value())
                .message("The credentials are incorrect.")
                .build();

        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<@NonNull ErrorResponse> handleGeneric(Exception ex, HttpServletRequest request) {
        return ResponseEntity.status(500).body(
                ErrorResponseFactory.InternalServerErrorResponse(ex.getMessage(), request.getRequestURI()));
    }

}
