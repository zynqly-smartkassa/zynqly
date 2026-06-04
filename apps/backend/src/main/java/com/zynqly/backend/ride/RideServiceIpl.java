package com.zynqly.backend.ride;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.zynqly.backend.common.entities.Ride;
import com.zynqly.backend.common.repositories.RideRepository;
import com.zynqly.backend.ride.dto.CreateRideDto;
import com.zynqly.backend.ride.dto.RideResponseDto;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RideServiceIpl implements RideService {

    private final RideRepository rideRepository;
    private final RideMapper rideMapper;

    @Override
    public Page<RideResponseDto> getRides(Pageable pageable) {
        return rideRepository.findAll(pageable).map(rideMapper::toResponseDto);
    }

    @Override
    public Ride getRide(UUID id) {
        return rideRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Ride not found: " + id));
    }

    @Override
    public void createRide(CreateRideDto createRideDto) {
        rideRepository.save(rideMapper.toEntity(createRideDto));
    }

}
