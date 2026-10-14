package com.zynqly.backend.domain.dtos.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record StartRideRequest(
    @NotNull RideType rideType,
    @NotBlank @Size(max = 300) String pickupAddress,
    @NotBlank @Size(max = 300) String destinationAddress) {
  public enum RideType { PASSENGER, COURIER }
}
