package com.zynqly.backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zynqly.backend.domain.dtos.responses.Rides;
import com.zynqly.backend.services.RideService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping(path = "/api/v1/ride")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class RideController {

  private final RideService rideService;

@GetMapping(path = "/")
public ResponseEntity<List<Rides>> getRides() {

  List<Rides> rides = rideService.getRides();

  return new ResponseEntity<>(rides, HttpStatus.OK);
}
  
}
