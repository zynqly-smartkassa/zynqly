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

/**
 * Centralised translation of thrown exceptions into HTTP error responses.
 *
 * Maps domain and framework exceptions to the appropriate status codes and
 * response shapes so controllers stay free of error-handling boilerplate. Two
 * envelope shapes coexist: {@link ErrorResponse} (used for generic 404/500
 * errors) and {@link ApiError} (used for validation and authentication errors
 * where per-field details matter).
 *
 * @see OwnException
 * @see ApiError
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Translates {@link EntityNotFoundException} into a 404 response with the
     * standard {@link ErrorResponse} envelope.
     *
     * @return a 404 response carrying the not-found error body
     */
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<@NonNull ErrorResponse> handleNotFound(EntityNotFoundException ex,
            HttpServletRequest request) {
        return ResponseEntity.status(404).body(
                ErrorResponseFactory.NotFoundErrorResponse(ex.getMessage(), request.getRequestURI()));
    }

    /**
     * Translates {@link OwnException} into a 400 response with field-level
     * error details.
     *
     * @return a 400 response carrying the validation {@link ApiError}
     */
    @ExceptionHandler(OwnException.class)
    public ResponseEntity<ApiError> handleOwnException(OwnException ex) {

        ApiError error = ApiError.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .message(ex.getMessage())
                .errors(ex.getErrors())
                .build();

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);

    }

    /**
     * Maps Spring Security {@link AuthenticationException}s to a generic 401
     * response so clients cannot enumerate valid emails through the error
     * message.
     *
     * @return a 401 response with a generic credential-failure message
     */
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiError> handleAuthenticationException(AuthenticationException ex) {
        ApiError error = ApiError.builder()
                .status(HttpStatus.UNAUTHORIZED.value())
                .message("The credentials are incorrect.")
                .build();

        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

    /**
     * Catch-all handler that maps any unhandled exception to a 500 response.
     *
     * @return a 500 response carrying the generic error envelope
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<@NonNull ErrorResponse> handleGeneric(Exception ex, HttpServletRequest request) {
        return ResponseEntity.status(500).body(
                ErrorResponseFactory.InternalServerErrorResponse(ex.getMessage(), request.getRequestURI()));
    }

}
