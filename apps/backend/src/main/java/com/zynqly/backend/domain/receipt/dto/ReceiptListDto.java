package com.zynqly.backend.domain.receipt.dto;

import com.zynqly.backend.domain.receipt.Currency;
import com.zynqly.backend.domain.receipt.PaymentMethod;
import com.zynqly.backend.domain.receipt.PaymentStatus;
import com.zynqly.backend.domain.receipt.RideType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ReceiptListDto {
    private Long id;
    private String receiptNumber;
    private LocalDateTime issuedAt;
    private PaymentMethod paymentMethod;
    private PaymentStatus status;
    private BigDecimal total;
    private Currency currency;
}
