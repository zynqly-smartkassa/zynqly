package com.zynqly.backend.auth;

import com.zynqly.backend.auth.domain.dto.SignUpAccountResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zynqly.backend.auth.domain.dto.AuthResponseDto;
import com.zynqly.backend.auth.domain.dto.SignInAccountRequestDto;
import com.zynqly.backend.auth.domain.dto.SignUpAccountRequestDto;
import com.zynqly.backend.common.entities.User;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;
	private final JwtService jwtService;
	
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

	/**
     * Handles user sign-in requests.
     * Authenticates user credentials and returns authentication tokens.
     *
     * @param signUpAccountRequestDto the payload containing sign-in details
     * @param request                 the HTTP request
     * @param response                the HTTP response to attach the refresh token cookie
     * @return ResponseEntity containing the authentication response with the access token
     */
    @PostMapping(path = "/sign-in")
    public ResponseEntity<AuthResponseDto> signInAccount(
            @Valid @RequestBody SignInAccountRequestDto signUpAccountRequestDto,
            HttpServletRequest request,
            HttpServletResponse response) {

        UserDetails userDetails = authService.authenticate(
                signUpAccountRequestDto.getUsername(),
                signUpAccountRequestDto.getPassword());

        AuthResponseDto authResponseDto = createAuthResponseDto(userDetails.getUsername(), response);

        return ResponseEntity.ok(authResponseDto);
    }

    /**
     * Creates a new access token using a valid refresh token.
     * Validates the refresh token from cookies and generates a new access token.
     *
     * @param request  the HTTP request containing the refresh token cookie
     * @param response the HTTP response
     * @return ResponseEntity containing the authentication response with a new access token or an error status
     */
    @GetMapping(path = "/access-jwt")
    public ResponseEntity<?> createAccessJwt(HttpServletRequest request, HttpServletResponse response) {

        String refreshTk = jwtService.extractRefreshTk(request);

        if (refreshTk == null || refreshTk.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("The refresh token is missing");
        }

        UserDetails userDetails = jwtService.validateTk(refreshTk);

        AuthResponseDto authResponseDto = createAuthResponseDto(userDetails.getUsername(), null);

        return ResponseEntity.ok(authResponseDto);
    }

    /**
     * Creates an authentication response DTO with access and refresh tokens.
     * Generates an access token and optionally creates a refresh token cookie.
     *
     * @param username the username for which tokens are generated
     * @param response pass {@code null} to skip cookie creation (e.g., for access-token-only refresh)
     * @return AuthResponseDto containing the access token and expiration time
     */
    private AuthResponseDto createAuthResponseDto(String username, HttpServletResponse response) {

        String accessTk = jwtService.createAccessTk(username, TkName.ACCESS);

        if (response != null) {
            String refreshTk = jwtService.createRefreshTk(username, TkName.REFRESH);

            Cookie refreshCookie = new Cookie("refresh_jwt", refreshTk);
            refreshCookie.setHttpOnly(true);
            refreshCookie.setSecure(false);
            refreshCookie.setPath("/");
            refreshCookie.setMaxAge(30 * 24 * 60 * 60);

            response.addCookie(refreshCookie);
        }

        return AuthResponseDto.builder()
                .accessJwt(accessTk)
                .expiresIn(15 * 60L)
                .build();
    }

}
