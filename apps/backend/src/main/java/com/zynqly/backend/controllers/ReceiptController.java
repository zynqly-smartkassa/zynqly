package com.zynqly.backend.controllers;

import com.zynqly.backend.domain.dtos.factory.ErrorResponseFactory;
import com.zynqly.backend.domain.receipt.Receipt;
import com.zynqly.backend.domain.receipt.dto.ReceiptCreateDto;
import com.zynqly.backend.services.ReceiptService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/receipts")
@RequiredArgsConstructor
public class ReceiptController {

    private final ReceiptService receiptService;

    @GetMapping
    public ResponseEntity<?> getReceipts(HttpServletRequest request) {
        try {
        // TODO replace dummy data
            return ResponseEntity.ok(receiptService.getAllReceipts(0, 10, "total", true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ErrorResponseFactory.InternalServerErrorResponse(e, request));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReceiptById(@PathVariable int id, HttpServletRequest request) {
        try {
            Receipt receipt = receiptService.getReceiptById(id);
            if (receipt == null) {
                return ResponseEntity.status(404).body(ErrorResponseFactory.NotFoundErrorResponse(String.format("Receipt with ID %d not found", id), request.getRequestURI()));
            }
            return ResponseEntity.ok(receipt);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ErrorResponseFactory.InternalServerErrorResponse(e, request));
        }
    }

    @PostMapping
    public ResponseEntity<?> makeReceipt(@Valid @RequestBody ReceiptCreateDto receiptCreateDto, HttpServletRequest request) {
        try {
            return ResponseEntity.status(201).body(receiptService.createReceipt(receiptCreateDto));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(ErrorResponseFactory.InternalServerErrorResponse(e, request));
        }
    }
}
