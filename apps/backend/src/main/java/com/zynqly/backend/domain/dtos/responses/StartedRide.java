package com.zynqly.backend.domain.dtos.responses;

import java.time.Instant;
import java.util.UUID;
import com.zynqly.backend.domain.dtos.requests.StartRideRequest.RideType;

public record StartedRide(UUID id, RideType rideType, String pickupAddress,
    String destinationAddress, Instant startedAt, String status) {}
