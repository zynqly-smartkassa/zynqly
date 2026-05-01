package com.zynqly.backend.receipts;

import com.zynqly.backend.domain.receipt.Receipt;
import com.zynqly.backend.domain.receipt.dto.ReceiptCreateDto;
import com.zynqly.backend.domain.receipt.dto.ReceiptListDto;
import com.zynqly.backend.receipts.utils.ReceiptTestJsonFileNames;
import com.zynqly.backend.receipts.utils.ReceiptTestFactory;
import lombok.NonNull;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.JsonTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.boot.test.json.JsonContent;
import org.springframework.data.domain.Page;

import java.io.IOException;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@JsonTest
public class JsonSerializeTest {

    @Autowired
    private JacksonTester<@NonNull Receipt> receiptJacksonTester;

    @Autowired
    private JacksonTester<@NonNull ReceiptCreateDto> createReceiptDtoJacksonTester;

    @Autowired
    private JacksonTester<@NonNull Page<ReceiptListDto>> listReceiptPageJacksonTester;

    @Test
    void receiptSerializationTest() throws IOException {
        Receipt receipt = ReceiptTestFactory.getReceipt();
        JsonContent<@NonNull Receipt> json = receiptJacksonTester.write(receipt);

        assertThat(json).isStrictlyEqualToJson(ReceiptTestJsonFileNames.RECEIPT_FILE);

        assertThat(json).extractingJsonPathNumberValue("$.id").isEqualTo(receipt.getId().intValue());
        assertThat(json).extractingJsonPathNumberValue("$.ride_id").isEqualTo(receipt.getRide_id());
        assertThat(json).extractingJsonPathNumberValue("$.user_id").isEqualTo(receipt.getUser_id());
        assertThat(json).extractingJsonPathStringValue("$.issuedAt").startsWith("2026-01-15T10:30");
        assertThat(json).extractingJsonPathStringValue("$.paymentMethod").isEqualTo(receipt.getPaymentMethod().name());
        assertThat(json).extractingJsonPathStringValue("$.status").isEqualTo(receipt.getStatus().name());
        assertThat(json).extractingJsonPathNumberValue("$.subtotal").isEqualTo(receipt.getSubtotal().doubleValue());
        assertThat(json).extractingJsonPathNumberValue("$.taxRate").isEqualTo(receipt.getTaxRate().doubleValue());
        assertThat(json).extractingJsonPathNumberValue("$.taxAmount").isEqualTo(receipt.getTaxAmount().doubleValue());
        assertThat(json).extractingJsonPathNumberValue("$.discountAmount").isEqualTo(receipt.getDiscountAmount().doubleValue());
        assertThat(json).extractingJsonPathNumberValue("$.total").isEqualTo(receipt.getTotal().doubleValue());
        assertThat(json).extractingJsonPathNumberValue("$.tip").isEqualTo(receipt.getTip().doubleValue());
        assertThat(json).extractingJsonPathNumberValue("$.amountPaid").isEqualTo(receipt.getAmountPaid().doubleValue());
        assertThat(json).extractingJsonPathNumberValue("$.change").isEqualTo(receipt.getChange().doubleValue());
        assertThat(json).extractingJsonPathStringValue("$.currency").isEqualTo(receipt.getCurrency().name());
        assertThat(json).extractingJsonPathStringValue("$.receiptNumber").isEqualTo(receipt.getReceiptNumber());
        assertThat(json).extractingJsonPathValue("$.notes").isNull();
    }

    @Test
    void createReceiptDtoSerializationTest() throws IOException {
        ReceiptCreateDto dto = ReceiptTestFactory.getRECEIPT_CREATE_DTO();
        JsonContent<@NonNull ReceiptCreateDto> json = createReceiptDtoJacksonTester.write(dto);

        assertThat(json).isStrictlyEqualToJson(ReceiptTestJsonFileNames.CREATE_RECEIPT_FILE);

        assertThat(json).extractingJsonPathNumberValue("$.ride_id").isEqualTo(dto.getRide_id());
        assertThat(json).extractingJsonPathStringValue("$.paymentMethod").isEqualTo(dto.getPaymentMethod().name());
        assertThat(json).extractingJsonPathNumberValue("$.discountAmount").isEqualTo(dto.getDiscountAmount().doubleValue());
        assertThat(json).extractingJsonPathNumberValue("$.tip").isEqualTo(dto.getTip().doubleValue());
        assertThat(json).extractingJsonPathNumberValue("$.amountPaid").isEqualTo(dto.getAmountPaid().doubleValue());
        assertThat(json).extractingJsonPathStringValue("$.currency").isEqualTo(dto.getCurrency().name());
        assertThat(json).extractingJsonPathValue("$.notes").isNull();
    }

    @Test
    void listReceiptDtoSerializationTest() throws IOException {
        Page<ReceiptListDto> page = ReceiptTestFactory.getLIST_RECEIPT_PAGE();
        JsonContent<@NonNull Page<ReceiptListDto>> json = listReceiptPageJacksonTester.write(page);

        assertThat(json).extractingJsonPathNumberValue("$.totalElements").isEqualTo((int) page.getTotalElements());
        assertThat(json).extractingJsonPathNumberValue("$.totalPages").isEqualTo(page.getTotalPages());
        assertThat(json).extractingJsonPathNumberValue("$.size").isEqualTo(page.getSize());
        assertThat(json).extractingJsonPathNumberValue("$.number").isEqualTo(page.getNumber());

        List<ReceiptListDto> list = page.getContent();
        for (int i = 0; i < list.size(); i++) {
            ReceiptListDto dto = list.get(i);
            assertThat(json).extractingJsonPathNumberValue("$.content[%d].id".formatted(i)).isEqualTo(dto.getId().intValue());
            assertThat(json).extractingJsonPathStringValue("$.content[%d].receiptNumber".formatted(i)).isEqualTo(dto.getReceiptNumber());
            assertThat(json).extractingJsonPathStringValue("$.content[%d].issuedAt".formatted(i)).startsWith(dto.getIssuedAt().toLocalDate().toString());
            assertThat(json).extractingJsonPathStringValue("$.content[%d].paymentMethod".formatted(i)).isEqualTo(dto.getPaymentMethod().name());
            assertThat(json).extractingJsonPathStringValue("$.content[%d].status".formatted(i)).isEqualTo(dto.getStatus().name());
            assertThat(json).extractingJsonPathNumberValue("$.content[%d].total".formatted(i)).isEqualTo(dto.getTotal().doubleValue());
            assertThat(json).extractingJsonPathStringValue("$.content[%d].currency".formatted(i)).isEqualTo(dto.getCurrency().name());
        }
    }
}
