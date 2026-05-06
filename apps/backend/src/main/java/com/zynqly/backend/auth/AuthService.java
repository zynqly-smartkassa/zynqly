package com.zynqly.backend.auth;

import org.springframework.security.core.userdetails.UserDetails;

import com.zynqly.backend.auth.dto.requests.SignUpAccountRequestDto;
import com.zynqly.backend.common.entities.User;

public interface AuthService {

	User signUpAccount(SignUpAccountRequestDto signUpAccountRequestDto);

	UserDetails authenticate(String email, String key);

}
