package com.zynqly.backend.controllers;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.security.Principal;
import java.util.UUID;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.zynqly.backend.domain.dtos.requests.StartRideRequest;
import com.zynqly.backend.domain.dtos.responses.StartedRide;
import com.zynqly.backend.services.RideStartService;

@RestController
@RequestMapping("/ride-starts")
public class RideStartController {
  private final RideStartService service;

  public RideStartController(RideStartService service) {
    this.service = service;
  }

  @PostMapping
  public ResponseEntity<StartedRide> start(@Valid @RequestBody StartRideRequest request, Principal principal) {
    StartedRide ride = service.start(request, principal.getName());
    return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(ride.id()).toUri()).body(ride);
  }

  @GetMapping("/{id}")
  public ResponseEntity<StartedRide> find(@PathVariable UUID id, Principal principal) {
    return ResponseEntity.of(service.find(id, principal.getName()));
  }
}
