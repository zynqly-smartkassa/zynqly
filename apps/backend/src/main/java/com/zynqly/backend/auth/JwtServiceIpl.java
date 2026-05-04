package com.zynqly.backend.auth;

import java.security.Key;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtServiceIpl implements JwtService {

	//private final UserDetailsService userDetailsService;

	@Value("${jwt.secret}")
	private String secretKey;

	private final long REFRESH_TK = 1000L * 60 * 60 * 24 * 30;
	private final long ACCESS_TK = 1000L * 60 * 15;

	/**
   * Validates a JWT token and loads the associated user details.
   *
   * @return UserDetails for the user identified in the token
   */
	@Override
	public UserDetails validateTk(String tk) {
		String username = extractUsername(tk);
		//return userDetailsService.loadUserByUsername(username);
		return User.withUsername(username)
		.password("")
		.authorities(Collections.emptyList())
		.build();

	}


	/**
   * Creates an access JWT token with specified expiry.
   *
   * @return the generated JWT token string
   */
	@Override
	public String createAccessTk(String username, TkName tkExpiry) {
		return createTk(username, tkExpiry);
	}

	/**
   * Creates a refresh JWT token.
   * Delegates to {@link #createTk} using {@code TkName.REFRESH} as the expiry type.
   *
   * @return the generated refresh token string
   */
	@Override
	public String createRefreshTk(String username, TkName tkExpiry) {
		return createTk(username, TkName.REFRESH);
	}

	/**
   * Extracts the access token from the Authorization header.
   *
   * @return the token string, or null if not present
   */
	@Override
	public String extractAccesTk(HttpServletRequest request) {

		String bearerTk = request.getHeader("Authorization");

		if (bearerTk != null && bearerTk.startsWith("Bearer ")) {
			return bearerTk.substring(7);
		}
		return null;
	}

	/**
   * Extracts the refresh token from HTTP cookies.
   *
   * @return the refresh token string, or null if not found
   */
	@Override
	public String extractRefreshTk(HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();
		if (cookies == null) {
			return null;
		}

		return Arrays.stream(cookies)
		.filter(cookie -> "refresh_tk".equals(cookie.getName()))
		.map(Cookie::getValue)
		.findFirst()
		.orElse(null);
	}
	/**
	* Creates a JWT token with the specified username and expiry type.
	*
	* @return the generated JWT token string
	*/
	private String createTk(String username, TkName tkExpiry) {

		long expiryMs;
		if (tkExpiry == TkName.ACCESS) {
			expiryMs = ACCESS_TK;
		} else {
			expiryMs = REFRESH_TK;
		}

		Map<String, Object> claims = new HashMap<>();
		return Jwts.builder()
		.setClaims(claims) // Infos which the frontend can read from without any request to the server: f.e
		// Role
		.setSubject(username)
		.setIssuedAt(new Date(System.currentTimeMillis()))
		.claim("type_jwt", tkExpiry)
		.setExpiration(new Date(System.currentTimeMillis() + expiryMs)) // Date needed for the server
		.signWith(getSigningKey(), SignatureAlgorithm.HS256) // Our checksum
		.compact(); // Creates the xxxxx.yyyyy.zzzzz String
	}

	/**
	* Generates the signing key from the secret key.
	*
	* @return the cryptographic HMAC-SHA key used for signing and verifying tokens
	*/
	private Key getSigningKey() {
		byte[] keyBytes = secretKey.getBytes();
		return Keys.hmacShaKeyFor(keyBytes);
	}

	/**
	* Extracts the username from a JWT token.
	*
	* @return the username stored in the token's subject claim
	*/
	private String extractUsername(String tk) {
		Claims claims = Jwts.parserBuilder()
		.setSigningKey(getSigningKey())
		.build()
		.parseClaimsJws(tk)
		.getBody();
		return claims.getSubject();
	}
}

