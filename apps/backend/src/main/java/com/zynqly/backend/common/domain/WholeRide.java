package com.zynqly.backend.common.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Data;

import java.util.List;

@Data
public class WholeRide {

  private double latitude;
  private double longitude;

  @JsonCreator
  public WholeRide(List<Double> coords) {
    this.latitude = coords.get(0);
    this.longitude = coords.get(1);
  }

}
