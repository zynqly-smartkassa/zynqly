package com.zynqly.backend.ride;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zynqly.backend.common.entities.Ride;
import com.zynqly.backend.ride.dto.CreateRideDto;
import com.zynqly.backend.ride.dto.RideResponseDto;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Tag(name = "Rides")
@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping(path = "/ride")
@RequiredArgsConstructor
public class RideController {

    private final RideService rideService;

    @GetMapping
    public ResponseEntity<@NonNull Page<RideResponseDto>> getRides(
            @PageableDefault(size = 6, sort = "startTime", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(rideService.getRides(pageable));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<@NonNull Ride> getRide(@PathVariable UUID id) {
        return ResponseEntity.ok(rideService.getRide(id));
    }

    @PostMapping
    public ResponseEntity<Void> createRide(@RequestBody CreateRideDto createRideDto) {
        rideService.createRide(createRideDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
