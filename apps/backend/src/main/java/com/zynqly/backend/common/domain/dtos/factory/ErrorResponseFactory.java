package com.zynqly.backend.common.domain.dtos.factory;

import com.zynqly.backend.common.domain.dtos.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;

/**
 * Static factory helpers for building the most common {@link ErrorResponse}
 * variants.
 *
 * Keeps the {@link com.zynqly.backend.common.exception.GlobalExceptionHandler}
 * concise by hiding the repeated boilerplate of choosing the right status,
 * reason phrase and request path.
 */
public class ErrorResponseFactory {
    /**
     * Builds a 500 response with an explicit message and request path.
     *
     * @return the assembled error response
     */
    public static ErrorResponse InternalServerErrorResponse(String message, String path) {
        return new ErrorResponse(500, "Internal Server Error", message, path);
    }

    /**
     * Builds a 500 response by extracting the message and request URI from the
     * supplied exception and HTTP request.
     *
     * @return the assembled error response
     */
    public static ErrorResponse InternalServerErrorResponse(Exception exception, HttpServletRequest request) {
        return new ErrorResponse(500, "Internal Server Error", exception.getMessage(), request.getRequestURI());
    }

    /**
     * Builds a 404 response with an explicit message and request path.
     *
     * @return the assembled error response
     */
    public static ErrorResponse NotFoundErrorResponse(String message, String path) {
        return new ErrorResponse(404, "Not Found", message, path);
    }

    /**
     * Builds a 404 response by extracting the message and request URI from the
     * supplied exception and HTTP request.
     *
     * @return the assembled error response
     */
    public static ErrorResponse NotFoundErrorResponse(Exception exception, HttpServletRequest request) {
        return new ErrorResponse(404, "Not Found", exception.getMessage(), request.getRequestURI());
    }

    /**
     * Builds an arbitrary error response. Prefer the dedicated 404/500 helpers
     * above when applicable.
     *
     * @return the assembled error response
     */
    public static ErrorResponse ErrorResponse(int status, String error, String message, String path) {
        return new ErrorResponse(status, error, message, path);
    }
}
