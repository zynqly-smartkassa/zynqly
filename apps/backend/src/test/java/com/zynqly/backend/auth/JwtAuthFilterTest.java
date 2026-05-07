package com.zynqly.backend.auth;

import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Collection;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zynqly.backend.auth.dto.requests.SignInAccountRequestDto;
import com.zynqly.backend.auth.dto.requests.SignUpAccountRequestDto;
import com.zynqly.backend.auth.security.CustomUserDetails;
import com.zynqly.backend.auth.security.JwtAuthFilter;
import com.zynqly.backend.auth.config.SecurityConfig;
import com.zynqly.backend.common.entities.User;
import com.zynqly.backend.common.exception.ApiError;
import com.zynqly.backend.common.exception.OwnException;
import com.zynqly.backend.utils.TestDataFactory;

import static org.mockito.ArgumentMatchers.any;

@WebMvcTest(JwtAuthFilter.class)
@AutoConfigureMockMvc(addFilters = true)
@Import({ JwtAuthFilterTest.MockJwtServiceConfig.class, SecurityConfig.class, JwtAuthFilterTest.TestController.class })
public class JwtAuthFilterTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtService jwtService;

    @TestConfiguration
    static class MockJwtServiceConfig {
        @Bean
        public JwtService jwtService() {
            return mock(JwtService.class);
        }
    }

    @RestController
    static class TestController {
        @GetMapping("/test")
        public String test() {
            return "";
        }
    }

    @Test
    void shouldLetRequestThrew() throws Exception {

        String email = "unknown@mail.com";
        String accessTk = "valid-token";

        CustomUserDetails userDetailsMock = mock(CustomUserDetails.class);
        when(jwtService.extractAccesTk(any())).thenReturn(accessTk);
        when(jwtService.validateTk(accessTk)).thenReturn(userDetailsMock);
        when(userDetailsMock.getUsername()).thenReturn(email);
        when(userDetailsMock.getAuthorities()).thenReturn(List.of());

        MvcResult result = mockMvc.perform(get("/test")
                .header("Authorization", "Bearer " + accessTk))
                .andReturn();

        Object attribute = result.getRequest().getAttribute("email");

        assertEquals(email, attribute);

    }

    @Test
    void shouldNotLetRequestThrew() throws Exception {

        when(jwtService.extractAccesTk(any())).thenReturn(null);

        MvcResult result = mockMvc.perform(get("/test")
                .header("Authorization", "Bearer valid-token"))
                .andExpect(status().isForbidden())
                .andReturn();

        Object attribute = result.getRequest().getAttribute("email");

        assertNull(attribute);

    }
}
