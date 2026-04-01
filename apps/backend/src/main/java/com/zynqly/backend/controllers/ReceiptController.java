package com.zynqly.backend.controllers;

import com.zynqly.backend.domain.dtos.responses.Receipt;
import com.zynqly.backend.services.ReceiptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/receipt")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ReceiptController {

    private final ReceiptService receiptService = new ReceiptService();

    @GetMapping
    public ResponseEntity<List<Receipt>> getReceipts() {
        return ResponseEntity.ok(receiptService.getReceipts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Receipt> getReceiptById(@PathVariable int id) {
        Receipt receipt = receiptService.getReceiptById(id);
        if (receipt == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(receipt);
    }

}
