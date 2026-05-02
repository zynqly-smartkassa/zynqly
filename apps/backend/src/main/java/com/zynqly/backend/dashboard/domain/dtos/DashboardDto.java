package com.zynqly.backend.dashboard.domain.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDto {

  private List<Stat>        stats;
  private List<MonthlyData> monthlyData;
  private List<WeeklyData>  weeklyData;
  private List<Settlement>  settlementData;
  private List<TopDriver>   topDrivers;

  // ── KPI card ────────────────────────────────────────────────
  @Data
  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  public static class Stat {
    /** Display label, e.g. "Total Revenue" */
    private String  label;
    /** Formatted display string, e.g. "11.340,00 €" */
    private String  value;
    /** Raw numeric value for backend calculations */
    private Double  rawValue;
    /** Human-readable change string, e.g. "+14,9% vs last month" */
    private String  change;
    /** Numeric change percentage; null when not applicable */
    private Double  changePercent;
    /** Whether the change is positive (green) or negative (red) */
    private boolean positive;
    /** Icon key used by the frontend: revenue | rides | drivers | fare */
    private String  icon;
  }

  // ── Area chart (monthly) ─────────────────────────────────────
  @Data
  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  public static class MonthlyData {
    private String month;
    private int    revenue;
    private int    rides;
  }

  // ── Bar chart (weekly) ───────────────────────────────────────
  @Data
  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  public static class WeeklyData {
    private String day;
    private int    brutto;
    private int    netto;
  }

  // ── Donut chart (settlement methods) ───────────────────────────
  @Data
  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  public static class Settlement {
    private String name;
    /** Percentage share, e.g. 62 */
    private int    value;
  }

  // ── Top drivers table ────────────────────────────────────────
  @Data
  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  public static class TopDriver {
    private String name;
    private int    rides;
    /** Formatted display string, e.g. "2.430 €" */
    private String revenue;
    /** Raw numeric value for sorting / calculations */
    private double revenueRaw;
    private double rating;
  }
}

