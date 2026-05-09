package com.zynqly.backend.receipt;

import com.zynqly.backend.receipt.domain.PaymentStatus;
import com.zynqly.backend.receipt.domain.Receipt;
import com.zynqly.backend.receipt.domain.dto.ReceiptCreateDto;
import com.zynqly.backend.receipt.domain.dto.ReceiptListDto;
import com.zynqly.backend.receipt.util.ReceiptCalculator;
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

    // TODO change sortBy Parameter to use Enum of keys instead of String, and add
    // filtering feature using same enum
    @Override
    public Page<@NonNull ReceiptListDto> getAllReceipts(int page, int size, String sortBy, boolean ascending) {
        Sort sorting;

        if (ascending) {
            sorting = Sort.by(sortBy).ascending();
        } else {
            sorting = Sort.by(sortBy).descending();
        }

        if (size > 50) {
            size = 50;
        }

        Pageable pageable = PageRequest.of(page, size, sorting);
        return receiptRepository.findAllAsDto(pageable);
    }

    @Override
    public Receipt getReceiptById(int id) {
        return receiptRepository.findById((long) id)
                .orElseThrow(() -> new EntityNotFoundException("Receipt with ID: %d not found".formatted(id)));
    }

    @Override
    public Receipt createReceipt(ReceiptCreateDto dto, int user_id) {
        BigDecimal taxRate = ReceiptCalculator.calculateTaxRate(dto.getRideType());
        BigDecimal subtotal = dto.getSubtotal();
        BigDecimal taxAmount = ReceiptCalculator.calculateTaxAmount(subtotal, taxRate);
        BigDecimal discountAmount = dto.getDiscountAmount() != null ? dto.getDiscountAmount() : BigDecimal.ZERO;
        BigDecimal tip = dto.getTip() != null ? dto.getTip() : BigDecimal.ZERO;
        BigDecimal total = ReceiptCalculator.calculateTotal(subtotal, taxAmount, discountAmount, tip);
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
