package com.zynqly.backend.receipts;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zynqly.backend.receipts.utils.ReceiptTestJsonFileNames;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Objects;

import static org.hamcrest.Matchers.nullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
public class IntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    private String loadJson(String fileName) throws Exception {
        return new String(Objects.requireNonNull(getClass().getResourceAsStream(fileName)).readAllBytes());
    }

    @Test
    void createReceipt_shouldReturn201() throws Exception {
        String requestBody = loadJson(ReceiptTestJsonFileNames.CREATE_RECEIPT_FILE);
        String responseBody = loadJson(ReceiptTestJsonFileNames.RECEIPT_FILE);

        JsonNode expected = new ObjectMapper().readTree(responseBody);

        mockMvc.perform(post("/api/v1/receipts/").content(requestBody).contentType(MediaType.APPLICATION_JSON))
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

    void findReceiptById_shouldReturn200() throws Exception {
        String requestBody = loadJson(ReceiptTestJsonFileNames.CREATE_RECEIPT_FILE);


        MvcResult mvcResult = mockMvc.perform(post("/api/v1/receipts/").content(requestBody).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated()).andReturn();

        String responseBody = mvcResult.getResponse().getContentAsString();
        JsonNode expected = new ObjectMapper().readTree(responseBody);

        mockMvc.perform(get("/api/v1/receipts/%d".formatted(expected.get("id").asInt())))
                .andExpect(status().isOk())
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
}
