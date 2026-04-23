package com.zynqly.backend.controllers;

import com.zynqly.backend.domain.dtos.responses.ErrorResponse;
import com.zynqly.backend.domain.receipt.Receipt;
import com.zynqly.backend.domain.receipt.dto.ReceiptCreateDto;
import com.zynqly.backend.services.ReceiptService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/receipts")
@RequiredArgsConstructor
public class ReceiptController {

    private final ReceiptService receiptService;

    @GetMapping
    public ResponseEntity<?> getReceipts(HttpServletRequest request) {
        try {
            return ResponseEntity.ok(receiptService.getReceipts());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ErrorResponse(e.getMessage(), request.getRequestURI()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReceiptById(@PathVariable int id, HttpServletRequest request) {
        try {
            Receipt receipt = receiptService.getReceiptById(id);
            if (receipt == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(receipt);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ErrorResponse(e.getMessage(), request.getRequestURI()));
        }
    }

    @PostMapping
    public ResponseEntity<?> makeReceipt(@Valid @RequestBody ReceiptCreateDto receiptCreateDto, HttpServletRequest request) {
        try {
            return ResponseEntity.status(201).body(receiptService.createReceipt(receiptCreateDto));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ErrorResponse(e.getMessage(), request.getRequestURI()));
        }
    }
}
