package com.zynqly.backend.auth.dto.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object for user sign-in requests.
 * Contains credentials required for user authentication.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignInAccountRequestDto {

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 20, message = "Username must be between {min} and {max} characters.")
    private String email;

    @NotBlank(message = "password is required")
    @Size(min = 6, message = "password must be at least {min} characters.")
    private String password;

}

