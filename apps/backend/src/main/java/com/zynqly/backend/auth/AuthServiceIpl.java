package com.zynqly.backend.auth;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.zynqly.backend.auth.domain.dto.SignUpAccountRequestDto;
import com.zynqly.backend.common.entities.User;
import com.zynqly.backend.common.exception.FormError;
import com.zynqly.backend.common.exception.OwnException;
import com.zynqly.backend.common.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class AuthServiceIpl implements AuthService  {


	private final UserRepository userRepository;
	private final PasswordEncoder encoder;
	private final AuthenticationManager authenticationManager;
	private final UserDetailsService userDetailsService;

	@Override
	public User signUpAccount(SignUpAccountRequestDto signUpAccountRequestDto) {

		List<FormError.FieldError> fieldErrors = new ArrayList<>();

		if (!userRepository.findByEmail(signUpAccountRequestDto.getEmail()).isEmpty()) {
			fieldErrors.add(FormError.FieldError.builder()
				.field("email")
				.message("The used email is already taken.")
				.build());
		} 

		if  (!userRepository.findByPhone(signUpAccountRequestDto.getPhone()).isEmpty()) {

			fieldErrors.add(FormError.FieldError.builder()
				.field("phone")
				.message("The used phone is already taken.")
				.build());

		}

		if (!fieldErrors.isEmpty()) {
			throw new OwnException(fieldErrors);
		}

		String encoded = encoder.encode(signUpAccountRequestDto.getPassword());
		User newUser = User.builder()
		.name(signUpAccountRequestDto.getName())
		.email(signUpAccountRequestDto.getEmail())
		.phone(signUpAccountRequestDto.getPhone())
		.role(signUpAccountRequestDto.getRole())
		.password(encoded)
		.build();

		return userRepository.save(newUser);
	}

	@Override
	public UserDetails authenticate(String email, String password) {
	
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

		return userDetailsService.loadUserByUsername(email);

	}
}
