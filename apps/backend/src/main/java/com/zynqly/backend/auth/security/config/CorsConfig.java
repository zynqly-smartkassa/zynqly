package com.zynqly.backend.auth.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

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
