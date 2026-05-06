package com.zynqly.backend.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zynqly.backend.auth.dto.requests.SignInAccountRequestDto;
import com.zynqly.backend.auth.dto.requests.SignUpAccountRequestDto;
import com.zynqly.backend.auth.dto.responses.AuthResponseDto;
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
	public ResponseEntity<AuthResponseDto> signUpAccount(@Valid @RequestBody SignUpAccountRequestDto signUpAccountRequestDto,
            HttpServletRequest request,
            HttpServletResponse response) {

		User user = authService.signUpAccount(signUpAccountRequestDto);

        AuthResponseDto authResponseDto = createAuthResponseDto(user.getEmail(), response);

		return new ResponseEntity<>(authResponseDto, HttpStatus.CREATED);
	}

	/**null
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
                signUpAccountRequestDto.getEmail(),
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
    @GetMapping(path = "/access-tk")
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

            Cookie refreshCookie = new Cookie("refresh_tk", refreshTk);
            refreshCookie.setHttpOnly(true);
            refreshCookie.setSecure(false);
            refreshCookie.setPath("/");
            refreshCookie.setMaxAge(30 * 24 * 60 * 60);

            response.addCookie(refreshCookie);
        }

        return AuthResponseDto.builder()
                .accessTk(accessTk)
                .expiresIn(15 * 60L)
                .build();
    }

}
