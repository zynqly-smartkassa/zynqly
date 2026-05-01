package com.zynqly.backend.common.domain.dtos.factory;

import com.zynqly.backend.common.domain.dtos.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;

public class ErrorResponseFactory {
    public static ErrorResponse InternalServerErrorResponse(String message, String path) {
        return new ErrorResponse(500, "Internal Server Error", message, path);
    }

    public static ErrorResponse InternalServerErrorResponse(Exception exception, HttpServletRequest request) {
        return new ErrorResponse(500, "Internal Server Error", exception.getMessage(), request.getRequestURI());
    }

    public static ErrorResponse NotFoundErrorResponse(String message, String path) {
        return new ErrorResponse(404, "Not Found", message, path);
    }

    public static ErrorResponse NotFoundErrorResponse(Exception exception, HttpServletRequest request) {
        return new ErrorResponse(404, "Not Found", exception.getMessage(), request.getRequestURI());
    }

    public static ErrorResponse ErrorResponse(int status, String error, String message, String path) {
        return new ErrorResponse(status, error, message, path);
    }
}
