package com.zynqly.backend.ride;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.zynqly.backend.common.entities.Ride;
import com.zynqly.backend.common.repositories.RideRepository;
import com.zynqly.backend.ride.dto.CreateRideDto;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RideServiceIpl implements RideService {

    private final RideRepository rideRepository;
    private final RideMapper rideMapper;

    @Override
    public List<Ride> getRides() {
        return rideRepository.findAll();
    }

    @Override
    public Ride getRide(UUID id) {
        return rideRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(""));
    }

    @Override
    public void createRide(CreateRideDto createRideDto) {

        Ride newRide = rideMapper.toEntity(createRideDto);

        rideRepository.save(newRide);

    }

}
