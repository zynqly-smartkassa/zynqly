package com.zynqly.backend.services;

import com.zynqly.backend.domain.receipt.Receipt;
import com.zynqly.backend.domain.receipt.dto.ReceiptCreateDto;
import com.zynqly.backend.domain.receipt.dto.ReceiptListDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ReceiptService {
    List<ReceiptListDto> getReceipts();

    Receipt getReceiptById(int id);

    Receipt createReceipt(ReceiptCreateDto receiptCreateDto);
}
