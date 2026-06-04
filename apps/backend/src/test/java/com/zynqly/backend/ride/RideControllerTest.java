package com.zynqly.backend.ride;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.zynqly.backend.ride.dto.RideResponseDto;

@WebMvcTest(RideController.class)
public class RideControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private RideService rideService;

    @Test
    void shouldReturnPaginatedRides() throws Exception {

        // 1. Some data to work with
        RideResponseDto ride = RideResponseDto.builder()
                .id(UUID.fromString("550e8400-e29b-41d4-a716-446655440000"))
                .dateTime("2026-04-11T08:15:00")
                .type("Passagier")
                .fromLocation("Hauptbahnhof")
                .toLocation("Flughafen")
                .amount(new BigDecimal("42.50"))
                .settlement("card")
                .status("completed")
                .build();

        // 2. Create a page
        List<RideResponseDto> rideList = List.of(ride);
        Page<RideResponseDto> mockPage = new PageImpl<>(rideList, PageRequest.of(0, 6), 1);

        // 3. Mock the service
        when(rideService.getRides(any(Pageable.class))).thenReturn(mockPage);

        // 4. Trigger the controller and assert
        mockMvc.perform(get("/ride"))
                .andExpect(status().isOk())

                // Ride data
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.content[0].fromLocation").value("Hauptbahnhof"))
                .andExpect(jsonPath("$.content[0].toLocation").value("Flughafen"))
                .andExpect(jsonPath("$.content[0].type").value("Passagier"))
                .andExpect(jsonPath("$.content[0].amount").value(42.50))

                // Page metadata
                .andExpect(jsonPath("$.page.totalElements").value(1))
                .andExpect(jsonPath("$.page.size").value(6))
                .andExpect(jsonPath("$.page.number").value(0));
    }

}
