package com.zynqly.backend.auth.security;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import com.zynqly.backend.auth.JwtService;

import java.io.IOException;

/**
 * Servlet filter that authenticates each request based on its bearer JWT.
 *
 * Extracts the access token from the {@code Authorization} header, validates
 * it through {@link JwtService}, and on success places an authenticated
 * {@link UsernamePasswordAuthenticationToken} (with the user's authorities)
 * into the security context for the remainder of the request. Invalid or
 * missing tokens are silently ignored so that downstream Spring Security
 * rules can decide whether to allow or reject the request.
 *
 * @see JwtService
 * @see com.zynqly.backend.auth.security.config.SecurityConfig
 */
@RequiredArgsConstructor
@Slf4j
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    /**
     * Inspects the incoming request for a bearer token, validates it, and
     * publishes the resulting authentication into the security context before
     * invoking the next filter in the chain.
     *
     * When a {@link CustomUserDetails} is produced, the user's email is also
     * exposed as the request attribute {@code "email"} so controllers can read
     * it directly without re-parsing the security context.
     *
     * @throws ServletException when the downstream chain raises a servlet error
     * @throws IOException when the downstream chain raises an I/O error
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        try {
            String tk = jwtService.extractAccesTk(request);

            if (tk != null) {

                UserDetails userDetails = jwtService.validateTk(tk);

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities());

                // We need to do this, so that every other filter and controller knows if the
                // current user that issued the request is already authenticated.
                SecurityContextHolder.getContext().setAuthentication(authentication);

                // After this we are able to directly access this attribute to get a user f.e,
                // resulting in less code
                if (userDetails instanceof CustomUserDetails) {
                    request.setAttribute("userId", ((CustomUserDetails) userDetails).getId());
                }

            }
        } catch (Exception ex) {
            log.warn("Received invalid access token");
        }

        // Calls the next filter in the chain
        filterChain.doFilter(request, response);
    }

}

