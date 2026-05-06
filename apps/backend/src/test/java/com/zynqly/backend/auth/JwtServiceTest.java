package com.zynqly.backend.auth;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.util.ReflectionTestUtils;

import com.zynqly.backend.auth.JwtService;

import jakarta.servlet.http.Cookie;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class JwtServiceTest {

	@Mock
	private UserDetailsService userDetailsService;

	@InjectMocks
	private JwtService jwtService;

	@BeforeEach
	void setUp() {
		ReflectionTestUtils.setField(jwtService, "secretKey",
				"6JdV8gkU9MfeAtDHc0qnRdQtdWhZ2VOyr+nMV6N9jDKuVnHpHLO98XPjmvh7MAlPiLNsxb+deTP1f8arBuwooA==");
	}

	@Test
	void shouldCreateAccessTk() {

		String email = "john@mail.com";

		String accessTk = jwtService.createAccessTk(email);

		assertNotNull(accessTk);
	}

	@Test
	void shouldCreateRefreshTk() {

		String email = "john@mail.com";

		String refreshTk = jwtService.createRefreshTk(email);

		assertNotNull(refreshTk);
	}

	@Test
	void shouldValidateTk() {

		String email = "john@mail.com";

		String tk = jwtService.createRefreshTk(email);

		UserDetails userDetailsMock = mock(UserDetails.class);
		when(userDetailsMock.getUsername()).thenReturn(email);

		when(userDetailsService.loadUserByUsername(email)).thenReturn(userDetailsMock);

		UserDetails userDetails = jwtService.validateTk(tk);

		assertNotNull(userDetails);
		assertEquals(email, userDetails.getUsername());
		verify(userDetailsService).loadUserByUsername(email);

	}

	@Test
	void shouldThrowExceptionWhenUserNotFound() {
		String email = "unknown@mail.com";
		String tk = jwtService.createAccessTk(email);

		when(userDetailsService.loadUserByUsername(email))
				.thenThrow(new UsernameNotFoundException("User not found"));

		assertThrows(UsernameNotFoundException.class, () -> {
			jwtService.validateTk(tk);
		});
	}

	@Test
	void shouldExtractAccessTk() {
		MockHttpServletRequest request = new MockHttpServletRequest();
		String accessTkMock = "New Access Tk";
		request.addHeader("Authorization", "Bearer " + accessTkMock);

		String accessTk = jwtService.extractAccesTk(request);

		assertNotNull(accessTk);
	}

	@Test
	void shouldNotExtractAccessTk() {

		MockHttpServletRequest request = new MockHttpServletRequest();

		String accessTk = jwtService.extractAccesTk(request);

		assertNull(accessTk);
	}

	@Test
	void shouldExtractRefreshTk() {

		MockHttpServletRequest request = new MockHttpServletRequest();

		Cookie cookie = new Cookie("refresh_tk", "New refresh tk");

		request.setCookies(cookie);

		String refreshTk = jwtService.extractRefreshTk(request);

		assertNotNull(refreshTk);
	}

	@Test
	void shouldNotExtractRefreshTk() {

		MockHttpServletRequest request = new MockHttpServletRequest();

		String refreshTk = jwtService.extractRefreshTk(request);

		assertNull(refreshTk);
	}

}
