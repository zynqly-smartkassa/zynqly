package com.zynqly.backend.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import org.springframework.http.MediaType;

import java.math.BigDecimal;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.zynqly.backend.domain.dtos.requests.CreateInvoiceRequest;
import com.zynqly.backend.domain.dtos.responses.InvoicesDto;
import com.zynqly.backend.services.InvoicesService;

@WebMvcTest(InvoicesController.class)
public class InvoicesControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockitoBean
  private InvoicesService invoicesService;

  @Test
  void shouldReturnInvoicesData() throws Exception {

    InvoicesDto.Invoice invoice = InvoicesDto.Invoice.builder()
        .id("INV-5512")
        .rideId("R-124521")
        .date("2025-05-05T15:15:15")
        .customer("Max")
        .amount(new BigDecimal(50))
        .status("overdue")
        .build();

    List<InvoicesDto.Invoice> invoicesList = List.of(invoice);
    Page<InvoicesDto.Invoice> mockPage = new PageImpl<>(invoicesList, PageRequest.of(0, 6), 1);

    when(invoicesService.getInvoices(any(Pageable.class))).thenReturn(mockPage);

    mockMvc.perform(get("/api/v1/invoices"))
        .andExpect(status().isOk())

        // Invoices data
        .andExpect(jsonPath("$.content").isArray())
        .andExpect(jsonPath("$.content[0].id").value("INV-5512"))
        // Page
        .andExpect(jsonPath("$.page.totalElements").value(1))
        .andExpect(jsonPath("$.page.size").value(6))
        .andExpect(jsonPath("$.page.number").value(0));
  }

  @Test
  void shouldCreateNewInvoice() throws Exception {

   doNothing().when(invoicesService).createInvoice(any(CreateInvoiceRequest.class));

    mockMvc.perform(post("/api/v1/invoices/create")
        .contentType(MediaType.APPLICATION_JSON)
        .content("""
            {"rideId":"R-124521","amount":50,"customer":"Max"}
            """))
        .andExpect(status().isOk());
  }

  @Test
  void shouldReturnStatsData() throws Exception {

    BigDecimal bigDecimal = new BigDecimal(50);

    InvoicesDto.Stats stats = InvoicesDto.Stats.builder()
        .totalInvoiced(bigDecimal)
        .paid(bigDecimal)
        .pending(bigDecimal)
        .overdue(bigDecimal)
        .build();

    when(invoicesService.getStats()).thenReturn(stats);

    mockMvc.perform(get("/api/v1/invoices/stats"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.totalInvoiced").exists());
  }

}
