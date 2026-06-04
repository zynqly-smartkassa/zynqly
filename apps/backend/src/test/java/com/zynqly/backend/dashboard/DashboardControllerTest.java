package com.zynqly.backend.dashboard;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.zynqly.backend.dashboard.domain.dtos.DashboardDto;

@WebMvcTest(DashboardController.class)
public class DashboardControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockitoBean
  private DashboardService dashboardService;

  @Test
  void shouldReturnDashboardData() throws Exception {

    // 1. Some data to work with
    DashboardDto.Stat revenueStat = DashboardDto.Stat.builder()
        .label("Total Revenue")
        .value("11.340,00 €")
        .rawValue(11340.0)
        .positive(true)
        .icon("revenue")
        .build();

    DashboardDto dashboardDto = DashboardDto.builder()
        .stats(List.of(revenueStat))
        .build();

    // 2. Mock the service
    when(dashboardService.getDashboard()).thenReturn(dashboardDto);

    // 3. Trigger the controller and assert
    mockMvc.perform(get("/dashboard"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.stats").isArray())
        .andExpect(jsonPath("$.stats[0].label").value("Total Revenue"))
        .andExpect(jsonPath("$.stats[0].positive").value(true));

  }
}
