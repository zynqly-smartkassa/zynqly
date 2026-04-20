package com.zynqly.backend.services.ipl;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.zynqly.backend.domain.dtos.requests.CreateInvoiceRequest;
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

  @Override
  public void createInvoice(CreateInvoiceRequest req) {
    try {
      InvoicesDto dto = jsonMapper.fromJson("data/invoices.json", InvoicesDto.class);
      List<Invoice> invoices = dto.getInvoices();

      // Next ID = highest existing number + 1
      int maxNum = invoices.stream()
          .map(inv -> inv.getId().replaceAll("\\D+", ""))
          .filter(s -> !s.isEmpty())
          .mapToInt(Integer::parseInt)
          .max()
          .orElse(1000);
      String newId  = String.format("INV-%04d", maxNum + 1);
      String rideId = req.getRideId() != null ? req.getRideId() : String.format("R-%04d", maxNum + 1);

      Invoice newInvoice = Invoice.builder()
          .id(newId)
          .rideId(rideId)
          .date(LocalDate.now().toString())
          .customer(req.getCustomer())
          .amount(req.getAmount())
          .status("pending")
          .build();

      // Prepend so the newest invoice appears first
      invoices.add(0, newInvoice);

      // Keep stats in sync
      InvoicesDto.Stats stats = dto.getStats();
      stats.setTotalInvoiced(stats.getTotalInvoiced().add(req.getAmount()));
      stats.setPending(stats.getPending().add(req.getAmount()));

      jsonMapper.toJson("data/invoices.json", dto);
    } catch (IOException e) {
      throw new UncheckedIOException("Failed to save invoice", e);
    }
  }

}
