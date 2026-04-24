package com.zynqly.backend.services.ipl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.zynqly.backend.domain.Rides;
import com.zynqly.backend.services.RideService;

import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

@Service
public class RideServiceIpl implements RideService {

  @Override
  public List<Rides> getRides() {
    ObjectMapper mapper = new ObjectMapper();
    try {
        // Path relative to resources folder
        ClassPathResource resource = new ClassPathResource("data/rides.json");
        
        // Gets the data and converts it directly to List
        return mapper.readValue(resource.getInputStream(), new TypeReference<List<Rides>>() {});
        
    } catch (IOException e) {
        e.printStackTrace();
        return new ArrayList<>();
    }
  }
  
}
