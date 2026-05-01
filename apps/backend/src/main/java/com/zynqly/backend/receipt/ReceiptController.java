package com.zynqly.backend.receipt;

import com.zynqly.backend.receipt.domain.Receipt;
import com.zynqly.backend.receipt.domain.dto.ReceiptCreateDto;
import com.zynqly.backend.receipt.domain.dto.ReceiptListDto;
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

    // TODO check for userId (when implemented) to return only authorized receipts
    @GetMapping
    public ResponseEntity<@NonNull Page<@NonNull ReceiptListDto>> getReceipts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "total") String sortBy,
            @RequestParam(defaultValue = "true") boolean ascending) {
        return ResponseEntity.ok(receiptService.getAllReceipts(page, size, sortBy, ascending));
    }

    // TODO check for userId (when implemented) to return only authorized receipts
    @GetMapping("/{id}")
    public ResponseEntity<@NonNull Receipt> getReceiptById(@PathVariable int id) {
        Receipt receipt = receiptService.getReceiptById(id);
        return ResponseEntity.ok(receipt);
    }

    // TODO implement real userId to being used here (when implemented)
    @PostMapping
    public ResponseEntity<@NonNull Receipt> makeReceipt(@Valid @RequestBody ReceiptCreateDto receiptCreateDto) {
        return ResponseEntity.status(201).body(receiptService.createReceipt(receiptCreateDto, 201));
    }
}
