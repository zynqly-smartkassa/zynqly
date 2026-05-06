package com.zynqly.backend.auth.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object for authentication responses.
 * Contains the access token and its expiration information.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponseDto {
    private String accessTk;
    private Long expiresIn;
}

