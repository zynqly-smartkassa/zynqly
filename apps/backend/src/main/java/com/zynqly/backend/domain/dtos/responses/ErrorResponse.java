package com.zynqly.backend.domain.dtos.responses;

import lombok.Getter;

@Getter
public class ErrorResponse {
    private final int status;
    private final String error;
    private final String message;
    private final String path;

    public ErrorResponse(String message, String path) {
        this.status = 500;
        this.error = "Internal Server Error";
        this.message = message;
        this.path = path;
    }
}
