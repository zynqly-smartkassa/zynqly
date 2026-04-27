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
    // TODO check for correct implementation and discuss with colleges
        BigDecimal taxRate = (dto.getRideType() == RideType.BOTENFAHRT) ? new BigDecimal("0.20") : new BigDecimal("0.10");
        BigDecimal subtotal = dto.getSubtotal();
        BigDecimal taxAmount = subtotal.multiply(taxRate).setScale(2, RoundingMode.HALF_UP);
        BigDecimal discountAmount = dto.getDiscountAmount() != null ? dto.getDiscountAmount() : BigDecimal.ZERO;
        BigDecimal tip = dto.getTip() != null ? dto.getTip() : BigDecimal.ZERO;
        BigDecimal total = subtotal.add(taxAmount).subtract(discountAmount);
        BigDecimal change = dto.getAmountPaid().subtract(total).subtract(tip).max(BigDecimal.ZERO);

        String receiptNumber = "REC-" + LocalDateTime.now().getYear() + "-" + System.currentTimeMillis();

        Receipt receipt = new Receipt();
        receipt.setRide_id(dto.getRide_id());
        receipt.setUser_id(user_id);
        receipt.setIssuedAt(LocalDateTime.now());
        receipt.setPaymentMethod(dto.getPaymentMethod());
        receipt.setStatus(PaymentStatus.PAID);
        receipt.setSubtotal(subtotal);
        receipt.setTaxRate(taxRate);
        receipt.setTaxAmount(taxAmount);
        receipt.setDiscountAmount(discountAmount);
        receipt.setTotal(total);
        receipt.setTip(tip);
        receipt.setAmountPaid(dto.getAmountPaid());
        receipt.setChange(change);
        receipt.setCurrency(dto.getCurrency());
        receipt.setReceiptNumber(receiptNumber);
        receipt.setNotes(dto.getNotes());

        return receiptRepository.save(receipt);
    }
}
