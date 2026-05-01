package com.zynqly.backend.ride_history;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.zynqly.backend.ride_history.dto.RideHistoryDto;

public interface RideHistoryService {

  Page<RideHistoryDto.Ride> getRideHistory(Pageable pageable);

}
