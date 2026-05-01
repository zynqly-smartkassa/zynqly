package com.zynqly.backend.auth;

import org.springframework.stereotype.Service;

import com.zynqly.backend.auth.domain.dto.SignUpAccountRequestDto;
import com.zynqly.backend.common.entities.User;
import com.zynqly.backend.common.repositories.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class AuthServiceIpl implements AuthService {


	private final UserRepository userRepository;

	@Override
	public User signUpAccount(SignUpAccountRequestDto signUpAccountRequestDto) {


		if (!userRepository.findByEmail(signUpAccountRequestDto.getEmail()).isEmpty()) {
			throw new EntityNotFoundException();
		} else if  (!userRepository.findByPhone(signUpAccountRequestDto.getPhone()).isEmpty()) {

			throw new EntityNotFoundException();

		}

		User newUser = User.builder()
		.name(signUpAccountRequestDto.getName())
		.email(signUpAccountRequestDto.getEmail())
		.role(signUpAccountRequestDto.getRole())
		.password(signUpAccountRequestDto.getPassword())
		.build();

		return userRepository.save(newUser);
	}
}
