package com.zynqly.backend.services.util.receipt;

import com.zynqly.backend.domain.receipt.RideType;

import java.math.BigDecimal;

public class ReceiptCalculator {

    public static BigDecimal calculateTaxRate(RideType rideType) {
        switch (rideType) {
            case ERRANDTRIP -> {
                return new BigDecimal("0.20");
            }
            case PASSENGERTRIP -> {
                return new BigDecimal("0.10");
            }
            case null, default ->
                    throw new IllegalArgumentException("Provide a type of Ride to calculate the tax rate");
        }
    }

    public static BigDecimal calculateTaxAmount(BigDecimal subtotal, RideType rideType) {
        BigDecimal taxRate = calculateTaxRate(rideType);
        return calculateTaxAmount(subtotal, taxRate);
    }

    public static BigDecimal calculateTaxAmount(BigDecimal subtotal, BigDecimal taxRate) {
        return subtotal.multiply(taxRate);
    }

    public static BigDecimal calculateTotal(BigDecimal subtotal, RideType rideType, BigDecimal discountAmount) {
        BigDecimal taxAmount = calculateTaxAmount(subtotal, rideType);
        return calculateTotal(subtotal, taxAmount, discountAmount);
    }

    public static BigDecimal calculateTotal(BigDecimal subtotal, BigDecimal taxAmount, BigDecimal discountAmount) {
        return subtotal.add(taxAmount).subtract(discountAmount);
    }

    public static BigDecimal calculateChange(BigDecimal total, BigDecimal amountPaid) {
        return amountPaid.subtract(total).max(BigDecimal.ZERO);
    }
}
