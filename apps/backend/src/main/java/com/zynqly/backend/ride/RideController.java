package com.zynqly.backend.ride;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.NonNull;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zynqly.backend.common.domain.Rides;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@Tag(name = "Rides")
@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping(path = "/ride")
@RequiredArgsConstructor
public class RideController {

  private final RideService rideService;

@GetMapping(path = "/")
public ResponseEntity<@NonNull List<Rides>> getRides() {

  List<Rides> rides = rideService.getRides();

  return new ResponseEntity<>(rides, HttpStatus.OK);
}
  
}
