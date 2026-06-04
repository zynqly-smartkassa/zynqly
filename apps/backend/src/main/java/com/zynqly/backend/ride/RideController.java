package com.zynqly.backend.ride;

import org.springframework.web.bind.annotation.RequestBody;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.NonNull;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zynqly.backend.common.entities.Ride;
import com.zynqly.backend.ride.dto.CreateRideDto;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Tag(name = "Rides")
@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping(path = "/ride")
@RequiredArgsConstructor
public class RideController {

  private final RideService rideService;

  @GetMapping
  public ResponseEntity<@NonNull List<Ride>> getRides() {

    List<Ride> rides = rideService.getRides();

    return new ResponseEntity<>(rides, HttpStatus.OK);
  }

   @GetMapping(path = "/{id}")
  public ResponseEntity<@NonNull Ride> getRide(@PathVariable UUID id) {

    Ride ride = rideService.getRide(id);

    return new ResponseEntity<>(ride, HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<Void> createRide(@RequestBody CreateRideDto createRideDto) {

    rideService.createRide(createRideDto);

    return new ResponseEntity<>(HttpStatus.OK);
  }


}
