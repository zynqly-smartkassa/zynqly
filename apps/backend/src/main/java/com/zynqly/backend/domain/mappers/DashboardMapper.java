package com.zynqly.backend.domain.mappers;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zynqly.backend.domain.dtos.responses.DashboardDto;

@Component
public class DashboardMapper {

  private static final String DATA_FILE = "data/dashboard.json";

  private final ObjectMapper objectMapper;

  public DashboardMapper(ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;
  }

  /**
   * Reads {@code data/dashboard.json} from the classpath and deserializes it
   * into a {@link DashboardDto} that can be returned directly to the frontend.
   *
   * @return fully populated {@link DashboardDto}
   * @throws IOException if the file cannot be read or parsed
   */
  public DashboardDto fromJson() throws IOException {
    ClassPathResource resource = new ClassPathResource(DATA_FILE);
    try (InputStream in = resource.getInputStream()) {
      return objectMapper.readValue(in, DashboardDto.class);
    }
  }
}

