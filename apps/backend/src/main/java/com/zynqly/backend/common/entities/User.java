package com.zynqly.backend.common.entities;

import java.util.UUID;

import com.zynqly.backend.auth.dto.requests.SignUpAccountRequestDto.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * JPA entity representing an application user.
 *
 * Stored in the {@code users} table; the password column always holds the
 * encoded hash produced by the configured {@code PasswordEncoder}, never the
 * raw value. The role is persisted as a string so the column remains readable
 * and refactors of the enum do not silently shift ordinals.
 *
 * @see com.zynqly.backend.common.repositories.UserRepository
 * @see com.zynqly.backend.auth.security.CustomUserDetails
 */
@Entity
@Table(name = "users")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String email;

	@Column(nullable = false)
	private String phone;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private Role role;
}
