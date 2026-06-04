package com.zynqly.backend.common.entities;

import java.math.BigDecimal;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "rides")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ride {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID userId;

    @Column(nullable = false)
    private String vehicleId;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String startAddress;

    @Column(nullable = false)
    private String endAddress;

    @Column(nullable = false)
    private String startTime;

    @Column(nullable = false)
    private String endTime;

    @Column(nullable = false)
    private String duration;

    @Column(nullable = false)
    private String distance;

    @Column(nullable = false)
    private String route;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(nullable = false)
    private String settlement;

    @Column(nullable = false)
    private String status;

    

}
