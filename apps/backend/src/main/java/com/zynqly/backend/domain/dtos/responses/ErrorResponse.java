package com.zynqly.backend.domain.dtos.responses;

import lombok.Getter;

@Getter
public class ErrorResponse {
    private final int status;
    private final String error;
    private final String message;
    private final String path;

    public ErrorResponse(int status, String error, String message, String path) {
        this.status = status;
        this.error = error != null ? error : "Internal Server Error";
        this.message = message;
        this.path = path;
    }
}
