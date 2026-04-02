package com.zynqly.backend.controllers;

import com.zynqly.backend.domain.receipt.Receipt;
import com.zynqly.backend.domain.receipt.dto.CreateReceiptDto;
import com.zynqly.backend.domain.receipt.dto.ListReceiptDto;
import com.zynqly.backend.services.ReceiptService;
import jakarta.validation.Valid;
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
    public ResponseEntity<@NonNull List<ListReceiptDto>> getReceipts() {
        try {
            return ResponseEntity.ok(receiptService.getReceipts());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<@NonNull Receipt> getReceiptById(@PathVariable int id) {
        try {
            Receipt receipt = receiptService.getReceiptById(id);
            if (receipt == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(receipt);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<@NonNull Receipt> makeReceipt(@Valid @RequestBody CreateReceiptDto createReceiptDto) {
        try {
            return ResponseEntity.ok(receiptService.createReceipt(createReceiptDto));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

}
