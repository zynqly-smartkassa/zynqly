package com.zynqly.backend.services.ipl;

import com.zynqly.backend.domain.receipt.PaymentStatus;
import com.zynqly.backend.domain.receipt.Receipt;
import com.zynqly.backend.domain.receipt.dto.ReceiptCreateDto;
import com.zynqly.backend.domain.receipt.dto.ReceiptListDto;
import com.zynqly.backend.repository.ReceiptRepository;
import com.zynqly.backend.services.ReceiptService;
import com.zynqly.backend.services.util.receipt.ReceiptCalculator;
import jakarta.persistence.EntityNotFoundException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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
        return receiptRepository.findById((long) id).orElseThrow(() -> new EntityNotFoundException("Receipt with ID: %d not found".formatted(id)));
    }

    @Override
    public Receipt createReceipt(ReceiptCreateDto dto, int user_id) {
        BigDecimal taxRate = ReceiptCalculator.calculateTaxRate(dto.getRideType());
        BigDecimal subtotal = dto.getSubtotal();
        BigDecimal taxAmount = ReceiptCalculator.calculateTaxAmount(subtotal, taxRate);
        BigDecimal discountAmount = dto.getDiscountAmount() != null ? dto.getDiscountAmount() : BigDecimal.ZERO;
        BigDecimal tip = dto.getTip() != null ? dto.getTip() : BigDecimal.ZERO;
        BigDecimal total = ReceiptCalculator.calculateTotal(subtotal, taxAmount, discountAmount);
        BigDecimal change = ReceiptCalculator.calculateChange(total, dto.getAmountPaid());

        String receiptNumber = Receipt.createReceiptNumber();

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
