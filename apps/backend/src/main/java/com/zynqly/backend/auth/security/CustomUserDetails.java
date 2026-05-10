package com.zynqly.backend.auth.security;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.zynqly.backend.common.entities.User;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CustomUserDetails implements UserDetails {

	private final User user;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));
	}

	@Override
	public @Nullable String getPassword() {
		return user.getPassword();

	}

	@Override
	public String getUsername() {
		return user.getEmail();
	}

	public String getEmail() {
		return user.getEmail();
	}

	public UUID getId() {
		return user.getId();
	}

}
