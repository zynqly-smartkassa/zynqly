package com.zynqly.backend.repository;

import com.zynqly.backend.domain.receipt.Receipt;
import com.zynqly.backend.domain.receipt.dto.ReceiptListDto;
import lombok.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ReceiptRepository extends JpaRepository<@NonNull Receipt,@NonNull Long> {
    @Query("SELECT new com.zynqly.backend.domain.receipt.dto.ReceiptListDto(r.id, r.receiptNumber, r.issuedAt, r.paymentMethod, r.status, r.total, r.currency) FROM Receipt r")
    Page<ReceiptListDto> findAllAsDto(Pageable pageable);

    Receipt findReceiptById(Long id);
}
