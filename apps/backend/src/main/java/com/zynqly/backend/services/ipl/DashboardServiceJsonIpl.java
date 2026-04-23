package com.zynqly.backend.services.ipl;

import java.io.IOException;
import java.io.UncheckedIOException;

import org.springframework.stereotype.Service;

import com.zynqly.backend.domain.dtos.responses.DashboardDto;
import com.zynqly.backend.domain.mappers.JsonMapper;
import com.zynqly.backend.services.DashboardService;

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
