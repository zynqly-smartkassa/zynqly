package com.zynqly.backend.ride.dto;

import java.math.BigDecimal;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateRideDto {

    private UUID userId;

    private UUID vehicleId;

    private String type;

    private String startAddress;

    private String endAddress;

    private String startTime;

    private String endTime;

    private String duration;

    private String distance;

    private String route;

    private BigDecimal amount;

    private String settlement;

    private String status;

}
