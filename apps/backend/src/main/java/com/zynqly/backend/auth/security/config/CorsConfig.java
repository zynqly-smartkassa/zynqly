package com.zynqly.backend.auth.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Supplementary CORS configuration applied at the Spring MVC layer.
 *
 * Mirrors the origin allow-list used by the security layer so that the
 * various local clients (Next.js web, Flutter mobile, Swagger UI) and the
 * production frontend can call the API with credentials. This configuration
 * complements {@link SecurityConfig#corsConfigurationSource()} and is mainly
 * useful for non-secured MVC endpoints that bypass the security filter chain.
 *
 * @see SecurityConfig
 */
@Configuration
public class CorsConfig {

    /**
     * Registers the application-wide CORS mappings.
     *
     * @return a {@link WebMvcConfigurer} that exposes the allow-list to MVC
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // On which routes our cors config should be activated
                        .allowedOrigins(
                                "http://localhost:3000", // Main Next.Js Frontend
                                "http://localhost:3001", // Test Next.Js Frontend
                                "http://localhost:9100", // Flutter
                                "app://localhost", // Can also be used by Flutter
                                "http://localhost:8082" // Swagger UI
                )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
