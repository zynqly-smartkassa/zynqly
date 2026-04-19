package com.zynqly.backend.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import java.math.BigDecimal;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.zynqly.backend.domain.dtos.responses.RideHistoryDto;
import com.zynqly.backend.services.RideHistoryService;

@WebMvcTest(RideHistoryController.class)
public class RideHistoryControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockitoBean
  private RideHistoryService rideHistoryService;

  @Test
  void shouldRetrunRideHistoryData() throws Exception {

    // 1. Some data to work with
    RideHistoryDto.Ride ride = RideHistoryDto.Ride.builder()
        .id("R-1042")
        .from("Berlin")
        .to("Hamburg")
        .amount(new BigDecimal("50.00"))
        .build();

    // 2. Create a list
    List<RideHistoryDto.Ride> rideList = List.of(ride);
    Page<RideHistoryDto.Ride> mockPage = new PageImpl<>(rideList, PageRequest.of(0, 6), 1);

    // 3. Mock the service
    when(rideHistoryService.getRideHistory(any(Pageable.class))).thenReturn(mockPage);

    // 4. Trigger the controller and assert
    mockMvc.perform(get("/api/v1/ride-history"))
        .andDo(print())
        .andExpect(status().isOk())

        // Ride data
        .andExpect(jsonPath("$.content").isArray())
        .andExpect(jsonPath("$.content[0].id").value("R-1042"))
        // Page
        .andExpect(jsonPath("$.page.totalElements").value(1))
        .andExpect(jsonPath("$.page.size").value(6))
        .andExpect(jsonPath("$.page.number").value(0));
  }

}
