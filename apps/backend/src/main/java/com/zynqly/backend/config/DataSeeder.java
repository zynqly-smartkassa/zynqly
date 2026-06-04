package com.zynqly.backend.config;

import java.util.List;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.type.TypeReference;
import com.zynqly.backend.common.domain.mappers.JsonMapper;
import com.zynqly.backend.common.entities.Ride;
import com.zynqly.backend.common.repositories.RideRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements ApplicationRunner {

    private final RideRepository rideRepository;
    private final JsonMapper jsonMapper;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        seedRides();
    }

    private void seedRides() throws Exception {
        if (rideRepository.count() > 0) {
            log.info("Rides table already has data, skipping seed.");
            return;
        }

        List<Ride> rides = jsonMapper.fromJson("data/rides.json", new TypeReference<List<Ride>>() {});
        rideRepository.saveAll(rides);
        log.info("Seeded {} rides into the database.", rides.size());
    }

}
