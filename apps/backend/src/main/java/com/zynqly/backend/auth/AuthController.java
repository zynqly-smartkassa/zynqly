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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * REST controller responsible for handling authentication endpoints.
 *
 * Exposes the public sign-up, sign-in and access-token-refresh routes. On a
 * successful sign-up or sign-in a short-lived access token is returned in the
 * response body while the long-lived refresh token is written into an HTTP-only
 * cookie. The refresh endpoint reads that cookie to issue a fresh access token
 * without re-prompting the user for credentials.
 *
 * @see AuthService
 * @see JwtService
 */
@Tag(name = "Auth", description = "Sign-up, sign-in and token refresh — no authentication required")
@RestController
@RequestMapping(path = "/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;
	private final JwtService jwtService;

	/**
	 * Handles user registration requests.
	 *
	 * Persists a new user from the supplied payload, then issues an access token
	 * and attaches a refresh-token cookie to the response so the client is
	 * authenticated immediately after sign-up.
	 *
	 * @return the authentication response containing the access token and its
	 *         lifetime, with HTTP status 201 (Created)
	 */
	@Operation(
		summary = "Create a new account",
		description = "Registers a new user and returns an access token. " +
			"Returns an error (e.g. 409) if the email is already taken — in that case use sign-in instead."
	)
	@PostMapping(path = "/sign-up")
	public ResponseEntity<AuthResponseDto> signUp(@Valid @RequestBody SignUpAccountRequestDto signUpAccountRequestDto,
            HttpServletRequest request,
            HttpServletResponse response) {

		User user = authService.signUp(signUpAccountRequestDto);

        AuthResponseDto authResponseDto = createAuthResponseDto(user.getEmail(), response);

		return new ResponseEntity<>(authResponseDto, HttpStatus.CREATED);
	}

    /**
     * Handles user sign-in requests.
     *
     * Authenticates the supplied credentials against the configured
     * {@code AuthenticationManager}; on success a new access token is issued and
     * the refresh-token cookie is attached to the response.
     *
     * @return the authentication response containing the access token and its
     *         lifetime
     */
    @PostMapping(path = "/sign-in")
    public ResponseEntity<AuthResponseDto> signIn(
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
     * Issues a fresh access token from a valid refresh token cookie.
     *
     * Reads the {@code refresh_tk} cookie from the request, validates it via
     * {@link JwtService#validateTk(String)} and returns a new access token for
     * the same subject. The refresh cookie itself is not rotated.
     *
     * @return the authentication response containing the new access token, or
     *         HTTP 401 (Unauthorized) when the refresh cookie is missing
     */
    @GetMapping(path = "/access-tk")
    public ResponseEntity<?> createAccessTk(HttpServletRequest request, HttpServletResponse response) {

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
     * Builds the standard authentication response and, when a response is
     * supplied, attaches the refresh-token cookie.
     *
     * Pass {@code null} for the response argument to skip cookie creation, which
     * is what the refresh endpoint does because the client already holds a valid
     * cookie at that point.
     *
     * @return the populated {@link AuthResponseDto}
     */
    private AuthResponseDto createAuthResponseDto(String username, HttpServletResponse response) {

        String accessTk = jwtService.createAccessTk(username);

        if (response != null) {
            String refreshTk = jwtService.createRefreshTk(username);

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
