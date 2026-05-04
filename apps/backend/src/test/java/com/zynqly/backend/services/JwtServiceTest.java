package com.zynqly.backend.services;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.util.ReflectionTestUtils;

import com.zynqly.backend.auth.JwtServiceIpl;
import com.zynqly.backend.auth.TkName;

import jakarta.servlet.http.Cookie;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class JwtServiceTest {

	@Mock
	private UserDetailsService userDetailsService;

	@InjectMocks
	private JwtServiceIpl jwtService;

	@BeforeEach
	void setUp() {
		ReflectionTestUtils.setField(jwtService, "secretKey", "6JdV8gkU9MfeAtDHc0qnRdQtdWhZ2VOyr+nMV6N9jDKuVnHpHLO98XPjmvh7MAlPiLNsxb+deTP1f8arBuwooA==");
	}

	@Test
	void shouldCreateAccessTk() {

		String username = "john";

		String accessTk = jwtService.createAccessTk(username, TkName.ACCESS);

		assertNotNull(accessTk);
	}

	@Test
	void shouldCreateRefreshTk() {
		String username = "john";

		String refreshTk = jwtService.createRefreshTk(username, TkName.REFRESH);

		assertNotNull(refreshTk);
	}

	@Test
	void shouldValidateTk() {

		String username = "john";

		String tk = jwtService.createRefreshTk(username, TkName.REFRESH);

		//UserDetails userDetails = mock(UserDetails.class);

		//when(userDetailsService.loadUserByUsername(username)).thenReturn(userDetails);

		UserDetails userDetailsReturn = jwtService.validateTk(tk);

		assertNotNull(userDetailsReturn);
	}

	@Test
	void shouldExtractAccessTk() {
		MockHttpServletRequest request = new MockHttpServletRequest();
		String accessTk = "new Access Tk";
		request.addHeader("Authorization", "Bearer " + accessTk);

		String returnedAccessTk = jwtService.extractAccesTk(request);

		assertNotNull(returnedAccessTk);
	}

	@Test
	void shouldNotExtractAccessTk() {

		MockHttpServletRequest request = new MockHttpServletRequest();

		String returnedAccessTk = jwtService.extractAccesTk(request);

		assertNull(returnedAccessTk);
	}

	@Test
	void shouldExtractRefreshTk() {

		MockHttpServletRequest request = new MockHttpServletRequest();

		Cookie cookie = new Cookie("refresh_tk", "new refresh tk");

		request.setCookies(cookie);

		String returnedRefreshTk = jwtService.extractRefreshTk(request);

		assertNotNull(returnedRefreshTk);
	}

	@Test
	void shouldNotExtractRefreshTk() {

		MockHttpServletRequest request = new MockHttpServletRequest();

		String returnedRefreshTk = jwtService.extractRefreshTk(request);

		assertNull(returnedRefreshTk);
	}


}

