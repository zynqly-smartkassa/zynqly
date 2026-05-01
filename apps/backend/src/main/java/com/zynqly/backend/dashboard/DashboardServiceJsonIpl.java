package com.zynqly.backend.dashboard;

import java.io.IOException;
import java.io.UncheckedIOException;

import org.springframework.stereotype.Service;

import com.zynqly.backend.dashboard.domain.dtos.DashboardDto;
import com.zynqly.backend.common.domain.mappers.JsonMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardServiceJsonIpl implements DashboardService {

  private final JsonMapper jsonMapper;

  @Override
  public DashboardDto getDashboard() {
    try {
      return jsonMapper.fromJson("data/dashboard.json", DashboardDto.class);
    } catch (IOException e) {
      throw new UncheckedIOException("Failed to load dashboard data", e);
    }
  }
}
