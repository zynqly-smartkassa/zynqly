package com.zynqly.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zynqly.backend.domain.dtos.requests.SignUpAccountRequestDto;
import com.zynqly.backend.domain.dtos.responses.SignUpAccountResponse;
import com.zynqly.backend.domain.entities.User;
import com.zynqly.backend.services.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;
	
	@PostMapping(path = "/sign-up")
	public ResponseEntity<SignUpAccountResponse> signUpAccount(SignUpAccountRequestDto signUpAccountRequestDto) {

		User user = authService.signUpAccount(signUpAccountRequestDto);

		SignUpAccountResponse signUpAccountResponse = SignUpAccountResponse.builder()
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
