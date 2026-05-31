package com.zynqly.backend.common.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zynqly.backend.common.entities.User;

/**
 * Repository for {@link User} persistence operations.
 *
 * Backs both the sign-up uniqueness checks (email and phone) and the Spring
 * Security user lookup performed by
 * {@link com.zynqly.backend.auth.security.CustomUserDetailsService}.
 */
@Repository
public interface UserRepository extends JpaRepository<User, UUID> {


	/**
	 * Finds a user by email address.
	 *
	 * @return the matching user, or {@link Optional#empty()} when no user
	 *         exists for that email
	 */
	Optional<User> findByEmail(String email);


	/**
	 * Finds a user by phone number.
	 *
	 * @return the matching user, or {@link Optional#empty()} when no user
	 *         exists for that phone number
	 */
	Optional<User> findByPhone(String phone);


}

