package com.zynqly.backend.ride_history;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.zynqly.backend.ride_history.dto.RideHistoryDto;
import com.zynqly.backend.ride_history.dto.RideHistoryDto.Ride;
import com.zynqly.backend.common.domain.mappers.JsonMapper;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class RideHistorySerivceJsonIpl implements RideHistoryService {

  private final JsonMapper jsonMapper;

  @Override
  public Page<Ride> getRideHistory(Pageable pageable) {
    try {
      RideHistoryDto dto = jsonMapper.fromJson("data/ride-history.json", RideHistoryDto.class);
      List<Ride> allRides = dto.getRides();

      // Where to we set the start index for the first ride?
      int start = (int) pageable.getOffset();
      // We are using min to not eventually end up in an error
      int end = Math.min(start + pageable.getPageSize(), allRides.size());
      // Returns the 8 rides
      List<Ride> pageContent = allRides.subList(start, end);

      return new PageImpl<>(pageContent, pageable, allRides.size());
    } catch (IOException e) {
      throw new UncheckedIOException("Failed to load ride history data", e);
    }
  }

}
