package com.zynqly.backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zynqly.backend.domain.dtos.responses.RideHistoryDto;
import com.zynqly.backend.services.RideHistoryService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping(path = "/api/v1/ride-history")
@RequiredArgsConstructor
public class RideHistoryController {

  private final RideHistoryService rideHistoryService;

  @GetMapping
  public ResponseEntity<RideHistoryDto> getRideHistory() {

      RideHistoryDto rideHistoryDto = rideHistoryService.getRideHistory();

      return new ResponseEntity<>(rideHistoryDto, HttpStatus.OK);
  }
  
  
}
