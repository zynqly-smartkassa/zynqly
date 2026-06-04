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
public class RideResponseDto {

    private UUID id;
    private String dateTime;
    private String type;
    private String fromLocation;
    private String toLocation;
    private BigDecimal amount;
    private String settlement;
    private String status;

}
