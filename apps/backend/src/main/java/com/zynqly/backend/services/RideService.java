package com.zynqly.backend.services;

import java.util.List;

import com.zynqly.backend.domain.Rides;

public interface RideService {

  List<Rides> getRides();

}