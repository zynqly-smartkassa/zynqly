package com.zynqly.backend.auth.domain.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignUpAccountRequestDto {

    @NotBlank(message = "Name is required")
    @Size(min = 2, message = "Name must be at least {min} characters.")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Please enter a valid email address.")
    private String email;

    @NotBlank(message = "Phone is required")
    @Size(min = 10, message = "Phone must be at least {min} characters.")
    private String phone;

    @NotBlank(message = "password is required")
    @Size(min = 6, message = "password must be at least {min} characters.")
    private String password;
    
    @NotNull
    private Role role;

    public static enum Role {
        
        UNTERNEHMER,
        FAHRER,
        BUCHHALTER

    }
}

