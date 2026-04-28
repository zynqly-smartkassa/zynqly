package com.zynqly.backend.controllers;

import com.zynqly.backend.domain.dtos.factory.ErrorResponseFactory;
import com.zynqly.backend.domain.receipt.Receipt;
import com.zynqly.backend.domain.receipt.dto.ReceiptCreateDto;
import com.zynqly.backend.domain.receipt.dto.ReceiptListDto;
import com.zynqly.backend.services.ReceiptService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/receipts")
@RequiredArgsConstructor
public class ReceiptController {

    private final ReceiptService receiptService;

    @GetMapping
    public ResponseEntity<@NonNull Page<@NonNull ReceiptListDto>> getReceipts() {
        // TODO replace dummy data
        return ResponseEntity.ok(receiptService.getAllReceipts(0, 10, "total", true));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReceiptById(@PathVariable int id) {
        Receipt receipt = receiptService.getReceiptById(id);
        return ResponseEntity.ok(receipt);
    }

    @PostMapping
    public ResponseEntity<?> makeReceipt(@Valid @RequestBody ReceiptCreateDto receiptCreateDto) {
        // TODO implement real userId to being used here
        return ResponseEntity.status(201).body(receiptService.createReceipt(receiptCreateDto, 201));
    }
}
