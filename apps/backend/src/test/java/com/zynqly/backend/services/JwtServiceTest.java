package com.zynqly.backend.services;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.zynqly.backend.auth.JwtService;
import com.zynqly.backend.auth.TkName;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class JwtServiceTest {

	@Mock
	private UserDetailsService userDetailsService;

	@InjectMocks
	private JwtService jwtService;

	@Test
	void shouldCreateAccessTk() {

		String username = "zielinski";

		String accessTk = jwtService.createAccessTk(username, TkName.ACCESS);

		assertNotNull(accessTk);
	}
	
	@Test
	void shouldCreateRefreshTk() {
		String username = "zielinski";

		String refreshTk = jwtService.createRefreshTk(username, TkName.REFRESH);

		assertNotNull(refreshTk);
	}

	@Test
	void shouldValidateTk() {
		String tk = "";

		String username = "";

		UserDetails userDetails = mock(UserDetails.class);

		when(jwtService.extractUsername(tk)).thenReturn(username);

		when(userDetailsService.loadUserByUsername(username)).thenReturn(userDetails);

		UserDetails userDetailsReturn = jwtService.validateTk(tk);
		
		assertNotNull(userDetailsReturn);
	}
}

