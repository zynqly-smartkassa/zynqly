package com.zynqly.backend.ride;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.zynqly.backend.common.entities.Ride;
import com.zynqly.backend.ride.dto.CreateRideDto;
import com.zynqly.backend.ride.dto.RideResponseDto;

public interface RideService {

    Page<RideResponseDto> getRides(Pageable pageable);

    Ride getRide(UUID id);

    void createRide(UUID userId, CreateRideDto createRideDto);

}
