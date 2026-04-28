package com.zynqly.backend.services.ipl;

import com.zynqly.backend.domain.receipt.PaymentStatus;
import com.zynqly.backend.domain.receipt.Receipt;
import com.zynqly.backend.domain.receipt.RideType;
import com.zynqly.backend.domain.receipt.dto.ReceiptCreateDto;
import com.zynqly.backend.domain.receipt.dto.ReceiptListDto;
import com.zynqly.backend.repository.ReceiptRepository;
import com.zynqly.backend.services.ReceiptService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ReceiptServiceIpl implements ReceiptService {

    private final ReceiptRepository receiptRepository;

    @Override
    public Page<@NonNull ReceiptListDto> getAllReceipts(int page, int size, String sortBy, boolean ascending) {
        Sort sorting;

        if (ascending) {
            sorting = Sort.by(sortBy).ascending();
        } else {
            sorting = Sort.by(sortBy).descending();
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).and(sorting));
        return receiptRepository.findAllAsDto(pageable);
    }

    @Override
    public Receipt getReceiptById(int id) {
        return receiptRepository.findReceiptById((long) id);
    }

    @Override
    public Receipt createReceipt(ReceiptCreateDto dto, int user_id) {
        BigDecimal taxRate = (dto.getRideType() == RideType.ERRANDTRIP) ? new BigDecimal("0.20") : new BigDecimal("0.10");
        BigDecimal subtotal = dto.getSubtotal();
        BigDecimal taxAmount = subtotal.multiply(taxRate);
        BigDecimal discountAmount = dto.getDiscountAmount() != null ? dto.getDiscountAmount() : BigDecimal.ZERO;
        BigDecimal tip = dto.getTip() != null ? dto.getTip() : BigDecimal.ZERO;
        BigDecimal total = subtotal.add(taxAmount).subtract(discountAmount);
        BigDecimal change = dto.getAmountPaid().subtract(total).subtract(tip).max(BigDecimal.ZERO);

        String receiptNumber = "REC-" + LocalDateTime.now().getYear() + "-" + System.currentTimeMillis();

        Receipt receipt = Receipt.builder()
                .ride_id(dto.getRide_id())
                .user_id(user_id)
                .issuedAt(LocalDateTime.now())
                .paymentMethod(dto.getPaymentMethod())
                .status(PaymentStatus.PAID)
                .subtotal(subtotal)
                .taxRate(taxRate)
                .taxAmount(taxAmount)
                .discountAmount(discountAmount)
                .total(total)
                .tip(tip)
                .amountPaid(dto.getAmountPaid())
                .change(change)
                .currency(dto.getCurrency())
                .receiptNumber(receiptNumber)
                .rideType(dto.getRideType())
                .notes(dto.getNotes())
                .build();

        return receiptRepository.save(receipt);
    }
}
