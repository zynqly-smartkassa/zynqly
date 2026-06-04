package com.zynqly.backend.ride;

import java.util.List;
import java.util.UUID;

import com.zynqly.backend.common.entities.Ride;
import com.zynqly.backend.ride.dto.CreateRideDto;

public interface RideService {

  List<Ride> getRides();

  Ride getRide(UUID id);

  void createRide(CreateRideDto createRideDto);

}