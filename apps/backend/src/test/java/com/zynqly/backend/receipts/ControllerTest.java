package com.zynqly.backend.receipts;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zynqly.backend.controllers.ReceiptController;
import com.zynqly.backend.domain.receipt.dto.ReceiptCreateDto;
import com.zynqly.backend.domain.receipt.dto.ReceiptListDto;
import com.zynqly.backend.receipts.utils.ReceiptApiNames;
import com.zynqly.backend.receipts.utils.ReceiptTestJsonFileNames;
import com.zynqly.backend.receipts.utils.ReceiptTestFactory;
import com.zynqly.backend.services.ReceiptService;
import lombok.NonNull;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Objects;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.nullValue;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ReceiptController.class)
@AutoConfigureMockMvc
public class ControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ReceiptService receiptService;

    private String loadJson(String fileName) throws Exception {
        return new String(Objects.requireNonNull(getClass().getResourceAsStream(fileName)).readAllBytes());
    }

    @Test
    void createReceipt_shouldReturn201() throws Exception {
        String requestBody = loadJson(ReceiptTestJsonFileNames.CREATE_RECEIPT_FILE);
        String responseBody = loadJson(ReceiptTestJsonFileNames.RECEIPT_FILE);

        ReceiptCreateDto dto = ReceiptTestFactory.getRECEIPT_CREATE_DTO();

        JsonNode expected = new ObjectMapper().readTree(responseBody);
        when(receiptService.createReceipt(dto, ReceiptTestFactory.getDummy_user_id())).thenReturn(ReceiptTestFactory.getReceipt());

        mockMvc.perform(post(ReceiptApiNames.apiURL).content(requestBody).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.ride_id").value(expected.get("ride_id").asInt()))
                .andExpect(jsonPath("$.user_id").value(expected.get("user_id").asInt()))
                .andExpect(jsonPath("$.issuedAt").exists())
                .andExpect(jsonPath("$.paymentMethod").value(expected.get("paymentMethod").asText()))
                .andExpect(jsonPath("$.status").value(expected.get("status").asText()))
                .andExpect(jsonPath("$.subtotal").value(expected.get("subtotal").asDouble()))
                .andExpect(jsonPath("$.taxRate").value(expected.get("taxRate").asDouble()))
                .andExpect(jsonPath("$.taxAmount").value(expected.get("taxAmount").asDouble()))
                .andExpect(jsonPath("$.discountAmount").value(expected.get("discountAmount").asDouble()))
                .andExpect(jsonPath("$.total").value(expected.get("total").asDouble()))
                .andExpect(jsonPath("$.tip").value(expected.get("tip").asDouble()))
                .andExpect(jsonPath("$.amountPaid").value(expected.get("amountPaid").asDouble()))
                .andExpect(jsonPath("$.change").value(expected.get("change").asDouble()))
                .andExpect(jsonPath("$.currency").value(expected.get("currency").asText()))
                .andExpect(jsonPath("$.receiptNumber").value(expected.get("receiptNumber").asText()))
                .andExpect(jsonPath("$.notes", nullValue()))
                .andExpect(jsonPath("$.rideType").value(expected.get("rideType").asText()));
    }

    @Test
    void getReceipts_shouldReturn200andPage() throws Exception {
        Page<@NonNull ReceiptListDto> receiptListDtoPage = ReceiptTestFactory.getLIST_RECEIPT_PAGE();

        when(receiptService.getAllReceipts(0, 10, "total", true)).thenReturn(receiptListDtoPage);

        mockMvc.perform(get(ReceiptApiNames.apiURL)).andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.first").value(true))
                .andExpect(jsonPath("$.size").value(10))
                .andExpect(jsonPath("$.sort.sorted").value(true));
    }

    @Test
    void getReceiptById_shouldReturn200andReceipt() throws Exception {
        String responseBody = loadJson(ReceiptTestJsonFileNames.RECEIPT_FILE);

        JsonNode expected = new ObjectMapper().readTree(responseBody);

        when(receiptService.getReceiptById(1)).thenReturn(ReceiptTestFactory.getReceipt());
        when(receiptService.getReceiptById(2)).thenReturn(ReceiptTestFactory.getReceipt());


        mockMvc.perform(get(ReceiptApiNames.apiURL(1)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.ride_id").value(expected.get("ride_id").asInt()))
                .andExpect(jsonPath("$.user_id").value(expected.get("user_id").asInt()))
                .andExpect(jsonPath("$.issuedAt").exists())
                .andExpect(jsonPath("$.paymentMethod").value(expected.get("paymentMethod").asText()))
                .andExpect(jsonPath("$.status").value(expected.get("status").asText()))
                .andExpect(jsonPath("$.subtotal").value(expected.get("subtotal").asDouble()))
                .andExpect(jsonPath("$.taxRate").value(expected.get("taxRate").asDouble()))
                .andExpect(jsonPath("$.taxAmount").value(expected.get("taxAmount").asDouble()))
                .andExpect(jsonPath("$.discountAmount").value(expected.get("discountAmount").asDouble()))
                .andExpect(jsonPath("$.total").value(expected.get("total").asDouble()))
                .andExpect(jsonPath("$.tip").value(expected.get("tip").asDouble()))
                .andExpect(jsonPath("$.amountPaid").value(expected.get("amountPaid").asDouble()))
                .andExpect(jsonPath("$.change").value(expected.get("change").asDouble()))
                .andExpect(jsonPath("$.currency").value(expected.get("currency").asText()))
                .andExpect(jsonPath("$.receiptNumber").value(expected.get("receiptNumber").asText()))
                .andExpect(jsonPath("$.notes", nullValue()))
                .andExpect(jsonPath("$.rideType").value(expected.get("rideType").asText()));

        mockMvc.perform(get(ReceiptApiNames.apiURL(1)));
    }


    @Test
    void getReceiptById_shouldReturn404notFound() throws Exception {
        when(receiptService.getReceiptById(anyInt())).thenReturn(null);

        mockMvc.perform(get(ReceiptApiNames.apiURL(0))).andExpect(status().isNotFound())
                .andExpect(jsonPath("$.path").value(ReceiptApiNames.apiURL(99)));

        mockMvc.perform(get(ReceiptApiNames.apiURL(99)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.error").value("Not Found"))
                .andExpect(jsonPath("$.message").exists())
                .andExpect(jsonPath("$.path").value(ReceiptApiNames.apiURL(99)));
    }
}
