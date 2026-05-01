package com.zynqly.backend.receipt;

import com.zynqly.backend.receipt.domain.Receipt;
import com.zynqly.backend.receipt.domain.dto.ReceiptCreateDto;
import com.zynqly.backend.receipt.domain.dto.ReceiptListDto;
import lombok.NonNull;
import org.springframework.data.domain.Page;

public interface ReceiptService {
    Page<@NonNull ReceiptListDto> getAllReceipts(int page, int size, String sortBy, boolean ascending);

    Receipt getReceiptById(int id);

    Receipt createReceipt(ReceiptCreateDto receiptCreateDto, int user_id);

}
