package com.zynqly.backend.auth.security;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.zynqly.backend.common.entities.User;
import com.zynqly.backend.common.repositories.UserRepository;

/**
 * Custom UserDetailsService implementation for loading user-specific data.
 * Integrates with Spring Security's authentication mechanism.
 */
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    /**
     * Loads user details by username for authentication.
     *
     * @return CustomUserDetails containing user information
     * @throws UsernameNotFoundException if user is not found
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User with the username: " + email + " doesn't exist."));
        return new CustomUserDetails(user);
    }

}

