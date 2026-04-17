package com.zynqly.backend.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.zynqly.backend.domain.dtos.responses.RideHistoryDto;

public interface RideHistoryService {

  Page<RideHistoryDto.Ride> getRideHistory(Pageable pageable);

}
