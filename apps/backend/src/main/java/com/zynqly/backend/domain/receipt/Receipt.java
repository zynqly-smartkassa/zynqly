package com.zynqly.backend.domain.receipt;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Receipt {
    private int id;
    private int ride_id;
    private int user_id;

    private LocalDateTime issuedAt;
    private PaymentMethod paymentMethod;
    private PaymentStatus status;

    private BigDecimal subtotal;
    private BigDecimal taxRate;
    private BigDecimal taxAmount;
    private BigDecimal discountAmount;
    private BigDecimal total;
    private BigDecimal tip;
    private BigDecimal amountPaid;
    private BigDecimal change;
    private Currency currency;
    private String receiptNumber;
    private String notes;
}
