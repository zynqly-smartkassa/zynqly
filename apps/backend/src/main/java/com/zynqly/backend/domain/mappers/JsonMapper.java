package com.zynqly.backend.domain.mappers;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class JsonMapper {

  private final ObjectMapper objectMapper;

  public JsonMapper(ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;
  }

  public <T> T fromJson(String dataFile, Class<T> target) throws IOException {
    ClassPathResource resource = new ClassPathResource(dataFile);
    try (InputStream in = resource.getInputStream()) {
      return objectMapper.readValue(in, target);
    }
  }
}
