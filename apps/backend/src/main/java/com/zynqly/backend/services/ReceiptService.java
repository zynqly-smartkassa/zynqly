package com.zynqly.backend.services;

import com.zynqly.backend.domain.receipt.Receipt;
import com.zynqly.backend.domain.receipt.dto.ReceiptCreateDto;
import com.zynqly.backend.domain.receipt.dto.ReceiptListDto;
import lombok.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;

public interface ReceiptService {
    Page<@NonNull ReceiptListDto> getAllReceipts(int page, int size, String sortBy, boolean ascending);

    Receipt getReceiptById(int id);

    Receipt createReceipt(ReceiptCreateDto receiptCreateDto, int user_id);

}
