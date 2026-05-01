package com.zynqly.backend.ride_history.dto;

import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class RideHistoryDto {

  private List<Ride> rides;

  // ── Single ride entry ─────────────────────────────────────────
  @Data
  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  public static class Ride {
    /** Human-readable ride identifier, e.g. "R-1042" */
    private String        id;
    /** ISO-8601 datetime of the ride, e.g. "2026-04-11T08:15:00" */
    private String        dateTime;
    /** Ride type: "Passagier" | "Boten" */
    private String        type;
    /** Pickup location */
    private String        from;
    /** Drop-off location */
    private String        to;
    /** Fare amount */
    private BigDecimal    amount;
    /** Settlement method: "card" | "cash" */
    private String        settlement;
    /** Ride status: "completed" | "cancelled" | "pending" */
    private String        status;
  }

}
