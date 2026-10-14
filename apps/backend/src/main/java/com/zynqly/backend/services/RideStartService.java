package com.zynqly.backend.services;

import java.time.Instant;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import org.springframework.stereotype.Service;
import com.zynqly.backend.domain.dtos.requests.StartRideRequest;
import com.zynqly.backend.domain.dtos.responses.StartedRide;

/** Temporary storage for the ride-start prototype; cleared on application restart. */
@Service
public class RideStartService {
  private record OwnedRide(String owner, StartedRide ride) {}
  private final ConcurrentMap<UUID, OwnedRide> rides = new ConcurrentHashMap<>();

  public StartedRide start(StartRideRequest request, String owner) {
    StartedRide ride = new StartedRide(UUID.randomUUID(), request.rideType(),
        request.pickupAddress().strip(), request.destinationAddress().strip(),
        Instant.now(), "STARTED");
    rides.put(ride.id(), new OwnedRide(owner, ride));
    return ride;
  }

  public java.util.Optional<StartedRide> find(UUID id, String owner) {
    return java.util.Optional.ofNullable(rides.get(id))
        .filter(stored -> stored.owner().equals(owner))
        .map(OwnedRide::ride);
  }
}
