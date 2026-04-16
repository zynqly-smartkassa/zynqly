package com.zynqly.backend.services.ipl;

import java.io.IOException;
import java.io.UncheckedIOException;

import org.springframework.stereotype.Service;

import com.zynqly.backend.domain.dtos.responses.RideHistoryDto;
import com.zynqly.backend.domain.mappers.JsonMapper;
import com.zynqly.backend.services.RideHistoryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RideHistorySerivceJsonIpl implements RideHistoryService {

  private final JsonMapper jsonMapper;

  @Override
  public RideHistoryDto getRideHistory() {
    
      try {
      return jsonMapper.fromJson("data/ride-history.json", RideHistoryDto.class);
    } catch (IOException e) {
      // Since we have no ErrorController, this unchecked instance will be ignored
      throw new UncheckedIOException("Failed to load ride history data", e);
    }

  }

}
