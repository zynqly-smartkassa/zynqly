package com.zynqly.backend.controllers;

import com.zynqly.backend.domain.receipt.Receipt;
import com.zynqly.backend.domain.receipt.dto.ReceiptDto;
import com.zynqly.backend.services.ReceiptService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/receipts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ReceiptController {

    private final ReceiptService receiptService = new ReceiptService();

    @GetMapping
    public ResponseEntity<@NonNull List<ReceiptDto>> getReceipts() {
        return ResponseEntity.ok(receiptService.getReceipts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<@NonNull Receipt> getReceiptById(@PathVariable int id) {
        Receipt receipt = receiptService.getReceiptById(id);
        if (receipt == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(receipt);
    }

}
