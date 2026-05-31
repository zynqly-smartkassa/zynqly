package com.zynqly.backend.auth.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Legacy MVC CORS configuration scoped to the {@code /api/**} prefix.
 *
 * Kept for backwards compatibility with the original Vite-based frontend and
 * the deployed Vercel host. New entries should be added to
 * {@link com.zynqly.backend.auth.security.config.SecurityConfig#corsConfigurationSource()}
 * instead so all configuration lives in a single place.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * Registers the {@code /api/**} CORS mapping with the legacy allow-list.
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**").allowedOrigins("http://localhost:5173", "https://smart-kassa.vercel.app")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH").allowedHeaders("*").allowCredentials(true);
    }
}
