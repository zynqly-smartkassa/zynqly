package com.zynqly.backend.domain.dtos.responses;

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
public class InvoicesDto {

  private Stats         stats;
  private List<Invoice> invoices;

  // ── Aggregated stats ──────────────────────────────────────────
  @Data
  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  public static class Stats {
    /** Sum of all invoice amounts */
    private BigDecimal totalInvoiced;
    /** Sum of paid invoices */
    private BigDecimal paid;
    /** Sum of pending invoices */
    private BigDecimal pending;
    /** Sum of overdue invoices */
    private BigDecimal overdue;
  }

  // ── Single invoice entry ──────────────────────────────────────
  @Data
  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  public static class Invoice {
    /** Human-readable invoice identifier, e.g. "INV-1042" */
    private String     id;
    /** ID of the associated ride, e.g. "R-1042" */
    private String     rideId;
    /** ISO-8601 date of the invoice, e.g. "2026-04-11" */
    private String     date;
    /** Customer / passenger name */
    private String     customer;
    /** Invoice amount */
    private BigDecimal amount;
    /** Invoice status: "paid" | "pending" | "overdue" */
    private String     status;
  }
}
