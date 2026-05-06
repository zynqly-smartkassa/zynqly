package com.zynqly.backend.utils;

import com.zynqly.backend.auth.dto.requests.SignInAccountRequestDto;
import com.zynqly.backend.auth.dto.requests.SignUpAccountRequestDto;
import com.zynqly.backend.auth.dto.requests.SignUpAccountRequestDto.Role;
import com.zynqly.backend.common.entities.User;

public class TestDataFactory {

    public static User createDefaultUser() {
        return User.builder()
                .name("Max Mustermann")
                .email("test@mail.com")
                .phone("+43123456789")
                .password("hashed-password")
                .role(Role.UNTERNEHMER)
                .build();
    }

    public static SignUpAccountRequestDto createSignUpDto() {
        return SignUpAccountRequestDto.builder()
                .name("Max Mustermann")
                .email("test@mail.com")
                .phone("+43123456789")
                .password("ClearPassword")
                .role(Role.UNTERNEHMER)
                .build();
    }

    public static SignInAccountRequestDto createSignInDto() {
        return SignInAccountRequestDto.builder()
                .email("test@mail.com")
                .password("ClearPassword")
                .build();
    }
}