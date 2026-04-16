package com.zynqly.backend.services.ipl;

import java.io.IOException;
import java.io.UncheckedIOException;

import org.springframework.stereotype.Service;

import com.zynqly.backend.domain.dtos.responses.DashboardDto;
import com.zynqly.backend.domain.mappers.DashboardMapper;
import com.zynqly.backend.services.DashboardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardServiceJsonIpl implements DashboardService {

  private final DashboardMapper dashboardMapper;

  @Override
  public DashboardDto getDashboard() {
    try {
      return dashboardMapper.fromJson();
    } catch (IOException e) {
      throw new UncheckedIOException("Failed to load dashboard data", e);
    }
  }
}
