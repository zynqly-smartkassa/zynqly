package com.zynqly.backend.auth;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.zynqly.backend.auth.dto.requests.SignUpAccountRequestDto;
import com.zynqly.backend.common.entities.User;
import com.zynqly.backend.common.exception.ApiError;
import com.zynqly.backend.common.exception.OwnException;
import com.zynqly.backend.common.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

/**
 * Service layer responsible for sign-up and credential-authentication logic.
 *
 * Holds the business rules around creating a new {@link User} (unique email and
 * phone, password hashing) and delegates credential verification to the Spring
 * Security {@link AuthenticationManager}.
 *
 * @see AuthController
 * @see JwtService
 */
@Service
@RequiredArgsConstructor
public class AuthService  {

	private final UserRepository userRepository;
	private final PasswordEncoder encoder;
	private final AuthenticationManager authenticationManager;
	private final UserDetailsService userDetailsService;


	/**
	 * Registers a new user.
	 *
	 * Verifies that the requested email and phone number are not already in use,
	 * hashes the plain-text password with the configured {@link PasswordEncoder}
	 * and persists the resulting {@link User}.
	 *
	 * @return the persisted user entity, including the generated id
	 * @throws OwnException when the email or phone number is already taken; the
	 *                      exception carries one {@link ApiError.FieldError} per
	 *                      offending field
	 */
	public User signUp(SignUpAccountRequestDto signUpAccountRequestDto) {

		List<ApiError.FieldError> fieldErrors = new ArrayList<>();

		if (!userRepository.findByEmail(signUpAccountRequestDto.getEmail()).isEmpty()) {
			fieldErrors.add(ApiError.FieldError.builder()
				.field("email")
				.message("The used email is already taken.")
				.build());
		}

		if  (!userRepository.findByPhone(signUpAccountRequestDto.getPhone()).isEmpty()) {

			fieldErrors.add(ApiError.FieldError.builder()
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

	/**
	 * Verifies a user's credentials against the authentication manager.
	 *
	 * Runs the standard Spring Security username/password authentication flow
	 * and, on success, loads the matching {@link UserDetails} from the
	 * {@link UserDetailsService}.
	 *
	 * @return the loaded user details, ready to be used as the principal
	 * @throws org.springframework.security.core.AuthenticationException when the
	 *         credentials are invalid
	 */
	public UserDetails authenticate(String email, String password) {

		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

		return userDetailsService.loadUserByUsername(email);

	}
}
