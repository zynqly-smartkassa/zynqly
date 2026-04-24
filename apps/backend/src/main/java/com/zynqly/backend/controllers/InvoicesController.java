package com.zynqly.backend.controllers;

import lombok.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zynqly.backend.domain.dtos.requests.CreateInvoiceRequest;
import com.zynqly.backend.domain.dtos.responses.InvoicesDto;
import com.zynqly.backend.services.InvoicesService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping(path = "/invoices")
@RequiredArgsConstructor
public class InvoicesController {

  private final InvoicesService invoicesService;

  @GetMapping
  public ResponseEntity<@NonNull Page<InvoicesDto.@NonNull Invoice>> getInvoices(
      @PageableDefault(size = 6) Pageable pageable
  ) {
    return ResponseEntity.ok(invoicesService.getInvoices(pageable));
  }

  @GetMapping("/stats")
  public ResponseEntity<InvoicesDto.@NonNull Stats> getStats() {
    return ResponseEntity.ok(invoicesService.getStats());
  }

  @PostMapping("/create")
  public ResponseEntity<@NonNull Void> createInvoice(@RequestBody CreateInvoiceRequest createInvoiceRequest) {
      invoicesService.createInvoice(createInvoiceRequest);

      return new ResponseEntity<>(HttpStatus.OK);
  }
  
}
