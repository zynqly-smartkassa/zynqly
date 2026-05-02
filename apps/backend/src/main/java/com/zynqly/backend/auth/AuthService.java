package com.zynqly.backend.auth;

import com.zynqly.backend.auth.domain.dto.SignUpAccountRequestDto;
import com.zynqly.backend.common.entities.User;

public interface AuthService {

	User signUpAccount(SignUpAccountRequestDto signUpAccountRequestDto);

}
