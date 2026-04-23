package com.zynqly.backend.controllers;

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
@RequestMapping(path = "/api/v1/invoices")
@RequiredArgsConstructor
public class InvoicesController {

  private final InvoicesService invoicesService;

  @GetMapping
  public ResponseEntity<Page<InvoicesDto.Invoice>> getInvoices(
      @PageableDefault(page = 0, size = 6) Pageable pageable
  ) {
    return ResponseEntity.ok(invoicesService.getInvoices(pageable));
  }

  @GetMapping("/stats")
  public ResponseEntity<InvoicesDto.Stats> getStats() {
    return ResponseEntity.ok(invoicesService.getStats());
  }

  @PostMapping("/create")
  public ResponseEntity<Void> createInvoice(@RequestBody CreateInvoiceRequest createInvoiceRequest) {
      invoicesService.createInvoice(createInvoiceRequest);

      return new ResponseEntity<Void>(HttpStatus.OK);
  }
  
}
