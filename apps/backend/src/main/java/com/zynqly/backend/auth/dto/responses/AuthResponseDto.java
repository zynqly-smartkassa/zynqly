package com.zynqly.backend.auth.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Response payload returned by every successful auth endpoint.
 *
 * Exposes only the short-lived access token (the refresh token travels in a
 * separate HTTP-only cookie) and its remaining lifetime in seconds so the
 * client can schedule a silent refresh before expiry.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponseDto {
    private String accessTk;
    private Long expiresIn;
}

