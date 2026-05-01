package com.zynqly.backend.receipt.domain.dto;

import com.zynqly.backend.receipt.domain.Currency;
import com.zynqly.backend.receipt.domain.PaymentMethod;
import com.zynqly.backend.receipt.domain.RideType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
@Builder
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
    @DecimalMin("0.0")
    private BigDecimal subtotal;

    @NotNull
    private BigDecimal amountPaid;

    private RideType rideType;
}
