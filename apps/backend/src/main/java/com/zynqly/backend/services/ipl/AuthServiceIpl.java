package com.zynqly.backend.services.ipl;

import org.springframework.stereotype.Service;

import com.zynqly.backend.domain.dtos.requests.SignUpAccountRequestDto;
import com.zynqly.backend.domain.entities.User;
import com.zynqly.backend.repositories.UserRepository;
import com.zynqly.backend.services.AuthService;

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
