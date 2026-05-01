package com.zynqly.backend.ride_history;

import lombok.NonNull;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zynqly.backend.ride_history.dto.RideHistoryDto;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping(path = "/ride-history")
@RequiredArgsConstructor
public class RideHistoryController {

  private final RideHistoryService rideHistoryService;

  @GetMapping
  public ResponseEntity<@NonNull Page<RideHistoryDto.@NonNull Ride>> getRideHistory(
      @PageableDefault(size = 6) Pageable pageable) {
    Page<RideHistoryDto.@NonNull Ride> ridePage = rideHistoryService.getRideHistory(pageable);
    return ResponseEntity.ok(ridePage);
  }

}
