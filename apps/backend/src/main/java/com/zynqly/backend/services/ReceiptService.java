package com.zynqly.backend.services;

import com.zynqly.backend.domain.dtos.responses.Currency;
import com.zynqly.backend.domain.dtos.responses.PaymentMethod;
import com.zynqly.backend.domain.dtos.responses.PaymentStatus;
import com.zynqly.backend.domain.dtos.responses.Receipt;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public class ReceiptService {

    private List<Receipt> receiptList = List.of(
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

    public ReceiptService() {
    }

    public List<Receipt> getReceipts() {
        return this.receiptList;
    }

    public Receipt getReceiptById(int id) {
        return this.receiptList.stream().filter(receipt -> receipt.getId() == id).findFirst().orElse(null);
    }

}
