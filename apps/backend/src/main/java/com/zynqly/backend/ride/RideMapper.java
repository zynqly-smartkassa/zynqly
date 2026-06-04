package com.zynqly.backend.ride;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.zynqly.backend.common.entities.Ride;
import com.zynqly.backend.ride.dto.CreateRideDto;

@Mapper(componentModel = "spring")
public interface RideMapper {
    @Mapping(target = "id", ignore = true)
    Ride toEntity(CreateRideDto dto);
}