package com.zynqly.backend.controllers;

import com.zynqly.backend.domain.receipt.Receipt;
import com.zynqly.backend.domain.receipt.dto.ReceiptCreateDto;
import com.zynqly.backend.domain.receipt.dto.ReceiptListDto;
import com.zynqly.backend.services.ipl.ReceiptServiceIpl;
import jakarta.validation.Valid;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/receipts")
@RequiredArgsConstructor
public class ReceiptController {

    private final ReceiptServiceIpl receiptServiceIpl = new ReceiptServiceIpl();

    @GetMapping
    public ResponseEntity<@NonNull List<ReceiptListDto>> getReceipts() {
        try {
            return ResponseEntity.ok(receiptServiceIpl.getReceipts());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<@NonNull Receipt> getReceiptById(@PathVariable int id) {
        try {
            Receipt receipt = receiptServiceIpl.getReceiptById(id);
            if (receipt == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(receipt);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<@NonNull Receipt> makeReceipt(@Valid @RequestBody ReceiptCreateDto receiptCreateDto) {
        try {
            return ResponseEntity.status(201).body(receiptServiceIpl.createReceipt(receiptCreateDto));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

}
