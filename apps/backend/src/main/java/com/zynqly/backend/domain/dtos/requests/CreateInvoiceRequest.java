package com.zynqly.backend.domain.dtos.requests;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class CreateInvoiceRequest {
  private String     rideId;
  private String     customer;
  private BigDecimal amount;
}
