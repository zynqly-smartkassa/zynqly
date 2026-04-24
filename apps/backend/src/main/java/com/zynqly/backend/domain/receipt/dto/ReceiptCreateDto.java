package com.zynqly.backend.domain.receipt.dto;

import com.zynqly.backend.domain.receipt.Currency;
import com.zynqly.backend.domain.receipt.PaymentMethod;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
public class ReceiptCreateDto {
    @NotNull
    private Integer ride_id;

    @NotNull
    private PaymentMethod paymentMethod;

    @DecimalMin("0.0")
    private BigDecimal discountAmount;

    @Size(max = 255)
    private String notes;

    @NotNull
    private Currency currency;

    @DecimalMin("0.0")
    private BigDecimal tip;

    @NotNull
    private BigDecimal amountPaid;
}
