package com.zynqly.backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zynqly.backend.domain.dtos.responses.RideHistoryDto;
import com.zynqly.backend.services.RideHistoryService;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping(path = "/api/v1/ride-history")
@RequiredArgsConstructor
public class RideHistoryController {

  private final RideHistoryService rideHistoryService;

  @GetMapping
  public ResponseEntity<Page<RideHistoryDto.Ride>> getRideHistory(
      @PageableDefault(page = 0, size = 6) Pageable pageable) {
    Page<RideHistoryDto.Ride> ridePage = rideHistoryService.getRideHistory(pageable);
    return ResponseEntity.ok(ridePage);
  }

}
