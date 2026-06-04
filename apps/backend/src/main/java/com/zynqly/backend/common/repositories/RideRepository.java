package com.zynqly.backend.common.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zynqly.backend.common.entities.Ride;

@Repository
public interface RideRepository extends JpaRepository<Ride, UUID> {
}
