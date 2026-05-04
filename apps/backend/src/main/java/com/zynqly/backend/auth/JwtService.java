package com.zynqly.backend.auth;

import org.springframework.security.core.userdetails.UserDetails;

import jakarta.servlet.http.HttpServletRequest;

public interface JwtService {

	
	 /**
     * Creates an access JWT token for the given username.
     *
     * @return the generated access token as a string
     */
    String createAccessTk(String username, TkName tkExpiry);
    
    /**
     * Creates a refresh JWT token for the given username.
     *
     * @return the generated refresh token as a string
     */
    String createRefreshTk(String username, TkName tkExpiry);

    /**
     * Validates a JWT token and retrieves the associated user details.
     *
     * @return UserDetails object for the token's user
     */
    UserDetails validateTk(String tk);

    /**
     * Extracts the access token from the Authorization header of an HTTP request.
     *
     * @return the access token string, or null if not found
     */
    String extractAccesTk(HttpServletRequest request);

    /**
     * Extracts the refresh token from the cookies of an HTTP request.
     *
     * @return the refresh token string, or null if not found
     */
    String extractRefreshTk(HttpServletRequest request);


}
