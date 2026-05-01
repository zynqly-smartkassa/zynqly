package com.zynqly.backend.services;

import com.zynqly.backend.domain.dtos.requests.SignUpAccountRequestDto;
import com.zynqly.backend.domain.entities.User;

public interface AuthService {

	User signUpAccount(SignUpAccountRequestDto signUpAccountRequestDto);

}
