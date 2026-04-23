package com.zynqly.backend.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.zynqly.backend.domain.dtos.requests.CreateInvoiceRequest;
import com.zynqly.backend.domain.dtos.responses.InvoicesDto;

public interface InvoicesService {

  Page<InvoicesDto.Invoice> getInvoices(Pageable pageable);

  InvoicesDto.Stats getStats();

  void createInvoice(CreateInvoiceRequest createInvoiceRequest);

}
