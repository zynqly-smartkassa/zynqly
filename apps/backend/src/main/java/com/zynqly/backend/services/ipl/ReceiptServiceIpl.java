package com.zynqly.backend.services.ipl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.zynqly.backend.domain.receipt.PaymentStatus;
import com.zynqly.backend.domain.receipt.Receipt;
import com.zynqly.backend.domain.receipt.dto.ReceiptCreateDto;
import com.zynqly.backend.domain.receipt.dto.ReceiptListDto;
import com.zynqly.backend.domain.mappers.JsonMapper;
import com.zynqly.backend.services.ReceiptService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReceiptServiceIpl implements ReceiptService {

    private static final String DATA_FILE = "data/receipts.json";
    private static final TypeReference<List<Receipt>> RECEIPT_LIST_TYPE = new TypeReference<>() {
    };

    private final JsonMapper jsonMapper;

    private List<Receipt> loadReceipts() {
        try {
            return jsonMapper.fromJson(DATA_FILE, RECEIPT_LIST_TYPE);
        } catch (IOException e) {
            throw new UncheckedIOException("Failed to load receipts data", e);
        }
    }

    private void saveReceipts(List<Receipt> receipts) {
        try {
            jsonMapper.toJson(DATA_FILE, receipts);
        } catch (IOException e) {
            throw new UncheckedIOException("Failed to save receipts data", e);
        }
    }

    @Override
    public List<ReceiptListDto> getReceipts() {
        return loadReceipts().stream()
                .map(r -> new ReceiptListDto(r.getId(), r.getReceiptNumber(), r.getIssuedAt(),
                        r.getPaymentMethod(), r.getStatus(), r.getTotal(), r.getCurrency()))
                .collect(Collectors.toList());
    }

    @Override
    public Receipt getReceiptById(int id) {
        return loadReceipts().stream()
                .filter(r -> r.getId() == id)
                .findFirst()
                .orElse(null);
    }

    @Override
    public Receipt createReceipt(ReceiptCreateDto dto) {
        List<Receipt> receipts = loadReceipts();

        int nextId = receipts.stream().mapToInt(Receipt::getId).max().orElse(0) + 1;
        String receiptNumber = "REC-" + LocalDateTime.now().getYear() + "-" + String.format("%05d", nextId);

        BigDecimal taxRate = new BigDecimal("0.20");
        BigDecimal subtotal = dto.getAmountPaid();
        BigDecimal taxAmount = subtotal.multiply(taxRate).setScale(2, RoundingMode.HALF_UP);
        BigDecimal discountAmount = dto.getDiscountAmount() != null ? dto.getDiscountAmount() : BigDecimal.ZERO;
        BigDecimal tip = dto.getTip() != null ? dto.getTip() : BigDecimal.ZERO;
        BigDecimal total = subtotal.add(taxAmount).subtract(discountAmount);
        BigDecimal change = dto.getAmountPaid().subtract(total).subtract(tip).max(BigDecimal.ZERO);

        Receipt receipt = new Receipt(
                nextId,
                dto.getRide_id(),
                0,
                LocalDateTime.now(),
                dto.getPaymentMethod(),
                PaymentStatus.PAID,
                subtotal,
                taxRate,
                taxAmount,
                discountAmount,
                total,
                tip,
                dto.getAmountPaid(),
                change,
                dto.getCurrency(),
                receiptNumber,
                dto.getNotes()
        );

        receipts.add(receipt);
        saveReceipts(receipts);
        return receipt;
    }
}
