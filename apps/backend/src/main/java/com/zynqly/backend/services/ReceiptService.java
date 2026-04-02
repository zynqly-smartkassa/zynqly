package com.zynqly.backend.services;

import com.zynqly.backend.domain.receipt.Currency;
import com.zynqly.backend.domain.receipt.PaymentMethod;
import com.zynqly.backend.domain.receipt.PaymentStatus;
import com.zynqly.backend.domain.receipt.Receipt;
import com.zynqly.backend.domain.receipt.dto.ReceiptDto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class ReceiptService {

    private final List<Receipt> receiptList = List.of(
            new Receipt(1, 101, 201, LocalDateTime.of(2026, 1, 15, 10, 30),
                    PaymentMethod.CARD, PaymentStatus.PAID,
                    new BigDecimal("18.50"), new BigDecimal("0.20"), new BigDecimal("3.70"),
                    new BigDecimal("0.00"), new BigDecimal("22.20"),
                    Currency.EUR, "REC-2026-00001", null),

            new Receipt(2, 102, 202, LocalDateTime.of(2026, 1, 16, 14, 45),
                    PaymentMethod.CASH, PaymentStatus.PAID,
                    new BigDecimal("12.00"), new BigDecimal("0.20"), new BigDecimal("2.40"),
                    new BigDecimal("1.50"), new BigDecimal("12.90"),
                    Currency.EUR, "REC-2026-00002", "Trinkgeld erhalten"),

            new Receipt(3, 103, 203, LocalDateTime.of(2026, 1, 17, 9, 0),
                    PaymentMethod.CARD, PaymentStatus.PENDING,
                    new BigDecimal("25.00"), new BigDecimal("0.20"), new BigDecimal("5.00"),
                    new BigDecimal("0.00"), new BigDecimal("30.00"),
                    Currency.EUR, "REC-2026-00003", null),

            new Receipt(4, 104, 201, LocalDateTime.of(2026, 1, 18, 18, 20),
                    PaymentMethod.TWINT, PaymentStatus.REFUNDED,
                    new BigDecimal("8.00"), new BigDecimal("0.20"), new BigDecimal("1.60"),
                    new BigDecimal("0.00"), new BigDecimal("9.60"),
                    Currency.EUR, "REC-2026-00004", "Fahrt storniert"),

            new Receipt(5, 105, 204, LocalDateTime.of(2026, 1, 19, 22, 10),
                    PaymentMethod.CASH, PaymentStatus.CANCELLED,
                    new BigDecimal("15.00"), new BigDecimal("0.20"), new BigDecimal("3.00"),
                    new BigDecimal("2.00"), new BigDecimal("16.00"),
                    Currency.EUR, "REC-2026-00005", null)
    );

    private final List<ReceiptDto> receiptDtoList = List.of(
            new ReceiptDto(1, "Beleg #1", LocalDateTime.of(2026, 1, 8, 23, 9), PaymentMethod.CASH, PaymentStatus.PAID, new BigDecimal("5.91"), Currency.EUR),
            new ReceiptDto(2, "Beleg #2", LocalDateTime.of(2026, 1, 8, 23, 10), PaymentMethod.CARD, PaymentStatus.PAID, new BigDecimal("5.80"), Currency.EUR),
            new ReceiptDto(3, "Beleg #3", LocalDateTime.of(2026, 1, 9, 0, 14), PaymentMethod.CARD, PaymentStatus.PAID, new BigDecimal("5.72"), Currency.EUR),
            new ReceiptDto(4, "Beleg #4", LocalDateTime.of(2026, 1, 9, 10, 5), PaymentMethod.CASH, PaymentStatus.PENDING, new BigDecimal("4.80"), Currency.EUR),
            new ReceiptDto(5, "Beleg #5", LocalDateTime.of(2026, 1, 10, 14, 33), PaymentMethod.CARD, PaymentStatus.CANCELLED, new BigDecimal("10.37"), Currency.EUR)
    );

    public ReceiptService() {
    }

    public List<ReceiptDto> getReceipts() {
        return this.receiptDtoList;
    }

    public Receipt getReceiptById(int id) {
        return this.receiptList.stream().filter(receipt -> receipt.getId() == id).findFirst().orElse(null);
    }

}
