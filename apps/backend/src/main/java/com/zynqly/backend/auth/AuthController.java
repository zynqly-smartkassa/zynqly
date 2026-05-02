package com.zynqly.backend.auth;

import com.zynqly.backend.auth.domain.dto.SignUpAccountResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zynqly.backend.auth.domain.dto.SignUpAccountRequestDto;
import com.zynqly.backend.common.entities.User;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;
	
	@PostMapping(path = "/sign-up")
	public ResponseEntity<SignUpAccountResponseDto> signUpAccount(@RequestBody SignUpAccountRequestDto signUpAccountRequestDto) {

		User user = authService.signUpAccount(signUpAccountRequestDto);

		SignUpAccountResponseDto signUpAccountResponse = SignUpAccountResponseDto.builder()
		.name(user.getName())
		.email(user.getEmail())
		.phone(user.getPhone())
		.role(user.getRole())
		.build();

		return new ResponseEntity<>(signUpAccountResponse, HttpStatus.CREATED);
	}

	@PostMapping(path = "/sign-in")
	public ResponseEntity<Void> signInAccount() {

		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	

}
