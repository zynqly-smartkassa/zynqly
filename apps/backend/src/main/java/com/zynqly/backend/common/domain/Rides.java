package com.zynqly.backend.common.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Rides {

  private int ride_id;
  private int vehicle_id;
  private int user_id;
  private String start_address;
  private String start_time;
  private String end_address;
  private String end_time;
  private String duration;
  private int distance;
  private String ride_type;
  private List<List<WholeRide>> whole_ride;

}
