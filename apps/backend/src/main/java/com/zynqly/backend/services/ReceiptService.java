package com.zynqly.backend.services;

import com.zynqly.backend.domain.receipt.Currency;
import com.zynqly.backend.domain.receipt.PaymentMethod;
import com.zynqly.backend.domain.receipt.PaymentStatus;
import com.zynqly.backend.domain.receipt.Receipt;
import com.zynqly.backend.domain.receipt.dto.CreateReceiptDto;
import com.zynqly.backend.domain.receipt.dto.ListReceiptDto;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ReceiptService {

    private final List<Receipt> receiptList = new ArrayList<>(List.of(
            // subtotal, taxRate, taxAmount, discountAmount, total, tip, amountPaid, change
            new Receipt(1, 101, 201, LocalDateTime.of(2026, 1, 15, 10, 30),
                    PaymentMethod.CARD, PaymentStatus.PAID,
                    new BigDecimal("18.50"), new BigDecimal("0.20"), new BigDecimal("3.70"),
                    new BigDecimal("0.00"), new BigDecimal("22.20"), new BigDecimal("0.00"),
                    new BigDecimal("22.20"), new BigDecimal("0.00"),
                    Currency.EUR, "REC-2026-00001", null),

            new Receipt(2, 102, 202, LocalDateTime.of(2026, 1, 16, 14, 45),
                    PaymentMethod.CASH, PaymentStatus.PAID,
                    new BigDecimal("12.00"), new BigDecimal("0.20"), new BigDecimal("2.40"),
                    new BigDecimal("0.00"), new BigDecimal("14.40"), new BigDecimal("1.50"),
                    new BigDecimal("20.00"), new BigDecimal("4.10"),
                    Currency.EUR, "REC-2026-00002", "Trinkgeld erhalten"),

            new Receipt(3, 103, 203, LocalDateTime.of(2026, 1, 17, 9, 0),
                    PaymentMethod.CARD, PaymentStatus.PENDING,
                    new BigDecimal("25.00"), new BigDecimal("0.20"), new BigDecimal("5.00"),
                    new BigDecimal("0.00"), new BigDecimal("30.00"), new BigDecimal("0.00"),
                    new BigDecimal("0.00"), new BigDecimal("0.00"),
                    Currency.EUR, "REC-2026-00003", null),

            new Receipt(4, 104, 201, LocalDateTime.of(2026, 1, 18, 18, 20),
                    PaymentMethod.TWINT, PaymentStatus.REFUNDED,
                    new BigDecimal("8.00"), new BigDecimal("0.20"), new BigDecimal("1.60"),
                    new BigDecimal("0.00"), new BigDecimal("9.60"), new BigDecimal("0.00"),
                    new BigDecimal("9.60"), new BigDecimal("0.00"),
                    Currency.EUR, "REC-2026-00004", "Fahrt storniert"),

            new Receipt(5, 105, 204, LocalDateTime.of(2026, 1, 19, 22, 10),
                    PaymentMethod.CASH, PaymentStatus.CANCELLED,
                    new BigDecimal("15.00"), new BigDecimal("0.20"), new BigDecimal("3.00"),
                    new BigDecimal("2.00"), new BigDecimal("16.00"), new BigDecimal("0.00"),
                    new BigDecimal("0.00"), new BigDecimal("0.00"),
                    Currency.EUR, "REC-2026-00005", null)
    ));

    private int id = 6;

    public ReceiptService() {
    }

    public List<ListReceiptDto> getReceipts() {
        return this.receiptList.stream().map(receipt ->
                new ListReceiptDto(receipt.getId(), receipt.getReceiptNumber(), receipt.getIssuedAt(),
                        receipt.getPaymentMethod(), receipt.getStatus(), receipt.getTotal(), receipt.getCurrency()))
                .collect(Collectors.toList());
    }

    public Receipt getReceiptById(int id) {
        return this.receiptList.stream().filter(receipt -> receipt.getId() == id).findFirst().orElse(null);
    }

    public Receipt createReceipt(CreateReceiptDto createReceiptDto) {
        BigDecimal taxRate = new BigDecimal("0.20");
        BigDecimal subtotal = createReceiptDto.getAmountPaid();
        BigDecimal taxAmount = subtotal.multiply(taxRate).setScale(2, RoundingMode.HALF_UP);
        BigDecimal discountAmount = createReceiptDto.getDiscountAmount();
        BigDecimal total = subtotal.add(taxAmount).subtract(discountAmount);
        BigDecimal tip = createReceiptDto.getTip();
        BigDecimal amountPaid = createReceiptDto.getAmountPaid();
        BigDecimal change = amountPaid.subtract(total).subtract(tip).max(BigDecimal.ZERO);
        String receiptNumber = "REC-" + LocalDateTime.now().getYear() + "-" + String.format("%05d", id);

        Receipt receipt = new Receipt(
                id,
                createReceiptDto.getRide_id(),
                0,
                LocalDateTime.now(),
                createReceiptDto.getPaymentMethod(),
                PaymentStatus.PAID,
                subtotal,
                taxRate,
                taxAmount,
                discountAmount,
                total,
                tip,
                amountPaid,
                change,
                createReceiptDto.getCurrency(),
                receiptNumber,
                createReceiptDto.getNotes()
        );

        receiptList.add(receipt);
        id++;
        return receipt;
    }

}
