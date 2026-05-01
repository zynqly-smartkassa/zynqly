package com.zynqly.backend.receipts.utils;

import com.zynqly.backend.receipt.domain.*;
import com.zynqly.backend.receipt.domain.dto.ReceiptCreateDto;
import com.zynqly.backend.receipt.domain.dto.ReceiptListDto;
import lombok.Getter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class ReceiptTestFactory {

    @Getter
    private static final int dummy_user_id = 201;

    @Getter
    private final static List<ReceiptListDto> LIST_RECEIPT_DTO = new ArrayList<>(List.of(
            ReceiptListDto.builder().id(1L).receiptNumber("REC-2026-00001").issuedAt(LocalDateTime.of(2026, 1, 15, 10, 30))
                    .paymentMethod(PaymentMethod.CARD).status(PaymentStatus.PAID)
                    .total(new BigDecimal("22.20")).currency(Currency.EUR).build(),

            ReceiptListDto.builder().id(2L).receiptNumber("REC-2026-00002").issuedAt(LocalDateTime.of(2026, 1, 16, 14, 45))
                    .paymentMethod(PaymentMethod.CASH).status(PaymentStatus.PAID)
                    .total(new BigDecimal("14.40")).currency(Currency.EUR).build(),

            ReceiptListDto.builder().id(3L).receiptNumber("REC-2026-00003").issuedAt(LocalDateTime.of(2026, 1, 17, 9, 0))
                    .paymentMethod(PaymentMethod.CARD).status(PaymentStatus.PENDING)
                    .total(new BigDecimal("30.00")).currency(Currency.EUR).build(),

            ReceiptListDto.builder().id(4L).receiptNumber("REC-2026-00004").issuedAt(LocalDateTime.of(2026, 1, 18, 18, 20))
                    .paymentMethod(PaymentMethod.APP).status(PaymentStatus.REFUNDED)
                    .total(new BigDecimal("9.60")).currency(Currency.EUR).build(),

            ReceiptListDto.builder().id(5L).receiptNumber("REC-2026-00005").issuedAt(LocalDateTime.of(2026, 1, 19, 22, 10))
                    .paymentMethod(PaymentMethod.CASH).status(PaymentStatus.CANCELLED)
                    .total(new BigDecimal("16.00")).currency(Currency.EUR).build()
    ));

    @Getter
    private static final Page<ReceiptListDto> LIST_RECEIPT_PAGE = new PageImpl<>(
            LIST_RECEIPT_DTO, PageRequest.of(0, 10, Sort.by("total").ascending()), LIST_RECEIPT_DTO.size()
    );

    @Getter
    private static final Receipt receipt = Receipt.builder()
            .id(1L).ride_id(101).user_id(dummy_user_id)
            .issuedAt(LocalDateTime.of(2026, 1, 15, 10, 30))
            .paymentMethod(PaymentMethod.CARD).status(PaymentStatus.PAID)
            .subtotal(new BigDecimal("18.50")).taxRate(new BigDecimal("0.20")).taxAmount(new BigDecimal("3.70"))
            .discountAmount(new BigDecimal("0.00")).total(new BigDecimal("22.20")).tip(new BigDecimal("0.00"))
            .amountPaid(new BigDecimal("22.20")).change(new BigDecimal("0.00"))
            .currency(Currency.EUR).receiptNumber("REC-2026-00001").notes(null).rideType(RideType.ERRANDTRIP)
            .build();

    /**
     * Receipt Object containing
     * @params ride_id =  101
     * @params paymentMethod = PaymentMethod.Card
     * @params discountAmount = 0.00
     * @params notes = null
     * @params currency = Currency.EUR
     * @params tip = 0.00
     * @params subtotal = 18.50
     * @params amountPaid = 22.20
     * @params rideType = RideType.ERRANDTRIP
     */
    @Getter
    private static final ReceiptCreateDto RECEIPT_CREATE_DTO = ReceiptCreateDto.builder()
            .ride_id(101).paymentMethod(PaymentMethod.CARD)
            .discountAmount(new BigDecimal("0.00")).notes(null)
            .currency(Currency.EUR).tip(new BigDecimal("0.00"))
            .subtotal(new BigDecimal("18.50")).amountPaid(new BigDecimal("22.20")).rideType(RideType.ERRANDTRIP)
            .build();
}
