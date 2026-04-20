package com.zynqly.backend.services.ipl;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.zynqly.backend.domain.dtos.responses.InvoicesDto;
import com.zynqly.backend.domain.dtos.responses.InvoicesDto.Invoice;
import com.zynqly.backend.domain.mappers.JsonMapper;
import com.zynqly.backend.services.InvoicesService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InvoicesServiceIpl implements InvoicesService {

  private final JsonMapper jsonMapper;

  @Override
  public Page<Invoice> getInvoices(Pageable pageable) {
    try {
      InvoicesDto invoicesDto = jsonMapper.fromJson("data/invoices.json", InvoicesDto.class);
      List<Invoice> allInvoices = invoicesDto.getInvoices();

      int start = (int) pageable.getOffset();
      int end = Math.min(start + pageable.getPageSize(), allInvoices.size());
      List<Invoice> pageContent = allInvoices.subList(start, end);

      return new PageImpl<>(pageContent, pageable, allInvoices.size());
    } catch (IOException e) {
      throw new UncheckedIOException("Failed to load invoices data", e);
    }
  }

  @Override
  public InvoicesDto.Stats getStats() {
    try {
      return jsonMapper.fromJson("data/invoices.json", InvoicesDto.class).getStats();
    } catch (IOException e) {
      throw new UncheckedIOException("Failed to load invoices data", e);
    }
  }

}
