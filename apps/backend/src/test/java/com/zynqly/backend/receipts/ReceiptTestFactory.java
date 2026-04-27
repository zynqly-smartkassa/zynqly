package com.zynqly.backend.receipts;

import com.zynqly.backend.domain.receipt.Currency;
import com.zynqly.backend.domain.receipt.PaymentMethod;
import com.zynqly.backend.domain.receipt.PaymentStatus;
import com.zynqly.backend.domain.receipt.Receipt;
import com.zynqly.backend.domain.receipt.dto.ReceiptCreateDto;
import com.zynqly.backend.domain.receipt.dto.ReceiptListDto;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class ReceiptTestFactory {

    @Getter
    private final static List<ReceiptListDto> LIST_RECEIPT_DTO = new ArrayList<>(List.of(
            new ReceiptListDto(1L, "REC-2026-00001", LocalDateTime.of(2026, 1, 15, 10, 30),
                    PaymentMethod.CARD, PaymentStatus.PAID,
                    new BigDecimal("22.20"), Currency.EUR),

            new ReceiptListDto(2L, "REC-2026-00002", LocalDateTime.of(2026, 1, 16, 14, 45),
                    PaymentMethod.CASH, PaymentStatus.PAID,
                    new BigDecimal("14.40"), Currency.EUR),

            new ReceiptListDto(3L, "REC-2026-00003", LocalDateTime.of(2026, 1, 17, 9, 0),
                    PaymentMethod.CARD, PaymentStatus.PENDING,
                    new BigDecimal("30.00"), Currency.EUR),

            new ReceiptListDto(4L, "REC-2026-00004", LocalDateTime.of(2026, 1, 18, 18, 20),
                    PaymentMethod.APP, PaymentStatus.REFUNDED,
                    new BigDecimal("9.60"), Currency.EUR),

            new ReceiptListDto(5L, "REC-2026-00005", LocalDateTime.of(2026, 1, 19, 22, 10),
                    PaymentMethod.CASH, PaymentStatus.CANCELLED,
                    new BigDecimal("16.00"), Currency.EUR)
    ));

    @Getter
    private static final Receipt receipt = new Receipt(1L, 101, 201, LocalDateTime.of(2026, 1, 15, 10, 30),
            PaymentMethod.CARD, PaymentStatus.PAID,
            new BigDecimal("18.50"), new BigDecimal("0.20"), new BigDecimal("3.70"),
            new BigDecimal("0.00"), new BigDecimal("22.20"), new BigDecimal("0.00"),
            new BigDecimal("22.20"), new BigDecimal("0.00"),
            Currency.EUR, "REC-2026-00001", null);

    @Getter
    private static final ReceiptCreateDto RECEIPT_CREATE_DTO = new ReceiptCreateDto(101, PaymentMethod.CARD,
            new BigDecimal("0.00"), null,
            Currency.EUR, new BigDecimal("0.00"), new BigDecimal("22.20"));

}
