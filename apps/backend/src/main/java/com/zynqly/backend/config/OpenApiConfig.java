package com.zynqly.backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "Zynqly API",
        version = "1.0",
        description = """
            ## Getting started

            Most routes require a valid JWT access token. Follow these steps:

            **1. Create an account**
            Call `POST /auth/sign-up` with email and password.
            → If you already have an account, skip this step — sign-up returns an error when the email is already taken, which is expected.

            **2. Sign in**
            Call `POST /auth/sign-in` with your credentials.
            Copy the `accessTk` value from the response body.

            **3. Authorize**
            Click the **Authorize 🔒** button at the top of this page.
            Paste **only the token** — no `Bearer` prefix, that is added automatically.

            **4. Test routes**
            All endpoints marked with 🔒 now send the Authorization header automatically.
            """
    )
)
@SecurityScheme(
    name = "bearerAuth",
    type = SecuritySchemeType.HTTP,
    scheme = "bearer",
    bearerFormat = "JWT",
    description = "Paste only the token — no 'Bearer ' prefix. It is added automatically by Swagger."
)
public class OpenApiConfig {}
