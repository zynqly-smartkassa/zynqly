package com.zynqly.backend.dashboard;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.NonNull;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zynqly.backend.dashboard.domain.dtos.DashboardDto;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@Tag(name = "Dashboard")
@SecurityRequirement(name = "bearerAuth")
@RestController()
@RequestMapping(path = "/dashboard")
@RequiredArgsConstructor
public class DashboardController {

  private final DashboardService dashboardService;

  @GetMapping
  public ResponseEntity<@NonNull DashboardDto> getDashboard() {

    DashboardDto dashboardDto = dashboardService.getDashboard();

    return new ResponseEntity<>(dashboardDto, HttpStatus.OK);

  }
  
  
}
