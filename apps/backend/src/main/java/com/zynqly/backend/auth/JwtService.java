package com.zynqly.backend.auth;

import java.security.Key;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.zynqly.backend.auth.dto.TkName;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtService {

	// private final UserDetailsService userDetailsService;

	@Value("${jwt.secret}")
	private String secretKey;

	private final long REFRESH_TK = 1000L * 60 * 60 * 24 * 30;
	private final long ACCESS_TK = 1000L * 60 * 15;
	private final UserDetailsService userDetailsService;

	public UserDetails validateTk(String tk) {
		String email = extractEmail(tk);
		return userDetailsService.loadUserByUsername(email);
	}

	public String createAccessTk(String email) {
		return createTk(email, TkName.ACCESS);
	}

	public String createRefreshTk(String email) {
		return createTk(email, TkName.REFRESH);
	}

	public String extractAccesTk(HttpServletRequest request) {

		String bearerTk = request.getHeader("Authorization");

		if (bearerTk != null && bearerTk.startsWith("Bearer ")) {
			return bearerTk.substring(7);
		}
		return null;
	}

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

	private String createTk(String email, TkName tkExpiry) {

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
				.setSubject(email)
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.claim("type_tk", tkExpiry)
				.setExpiration(new Date(System.currentTimeMillis() + expiryMs)) // Date needed for the server
				.signWith(getSigningKey(), SignatureAlgorithm.HS256) // Our checksum
				.compact(); // Creates the xxxxx.yyyyy.zzzzz String
	}

	private Key getSigningKey() {
		byte[] keyBytes = secretKey.getBytes();
		return Keys.hmacShaKeyFor(keyBytes);
	}

	private String extractEmail(String tk) {
		Claims claims = Jwts.parserBuilder()
				.setSigningKey(getSigningKey())
				.build()
				.parseClaimsJws(tk)
				.getBody();
		return claims.getSubject();
	}
}
