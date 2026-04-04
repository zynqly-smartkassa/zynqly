package com.zynqly.backend.receipts;

import com.zynqly.backend.domain.receipt.Receipt;
import com.zynqly.backend.domain.receipt.dto.CreateReceiptDto;
import com.zynqly.backend.domain.receipt.dto.ListReceiptDto;
import lombok.NonNull;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.JsonTest;
import org.springframework.boot.test.json.JacksonTester;

import java.io.IOException;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@JsonTest
public class JsonDeserializeTest {
    @Autowired
    private JacksonTester<@NonNull Receipt> receiptJacksonTester;

    @Autowired
    private JacksonTester<@NonNull CreateReceiptDto> createReceiptDtoJacksonTester;

    @Autowired
    private JacksonTester<@NonNull List<ListReceiptDto>> listReceiptDtoJacksonTester;

    @Test
    void receiptDeserializeTest() throws IOException {
        Receipt parsed = receiptJacksonTester.readObject(FileNames.RECEIPT_FILE);
        Receipt receipt = ReceiptTestFactory.getReceipt();

        assertThat(parsed.getId()).isEqualTo(receipt.getId());
        assertThat(parsed.getRide_id()).isEqualTo(receipt.getRide_id());
        assertThat(parsed.getUser_id()).isEqualTo(receipt.getUser_id());
        assertThat(parsed.getIssuedAt()).isEqualTo(receipt.getIssuedAt());
        assertThat(parsed.getPaymentMethod()).isEqualTo(receipt.getPaymentMethod());
        assertThat(parsed.getStatus()).isEqualTo(receipt.getStatus());
        assertThat(parsed.getSubtotal()).isEqualByComparingTo(receipt.getSubtotal());
        assertThat(parsed.getTaxRate()).isEqualByComparingTo(receipt.getTaxRate());
        assertThat(parsed.getTaxAmount()).isEqualByComparingTo(receipt.getTaxAmount());
        assertThat(parsed.getDiscountAmount()).isEqualByComparingTo(receipt.getDiscountAmount());
        assertThat(parsed.getTotal()).isEqualByComparingTo(receipt.getTotal());
        assertThat(parsed.getTip()).isEqualByComparingTo(receipt.getTip());
        assertThat(parsed.getAmountPaid()).isEqualByComparingTo(receipt.getAmountPaid());
        assertThat(parsed.getChange()).isEqualByComparingTo(receipt.getChange());
        assertThat(parsed.getCurrency()).isEqualTo(receipt.getCurrency());
        assertThat(parsed.getReceiptNumber()).isEqualTo(receipt.getReceiptNumber());
        assertThat(parsed.getNotes()).isNull();
    }

    @Test
    void createReceiptDtoDeserializeTest() throws IOException {
        CreateReceiptDto parsed = createReceiptDtoJacksonTester.readObject(FileNames.CREATE_RECEIPT_FILE);
        CreateReceiptDto dto = ReceiptTestFactory.getCreateReceiptDto();

        assertThat(parsed.getRide_id()).isEqualTo(dto.getRide_id());
        assertThat(parsed.getPaymentMethod()).isEqualTo(dto.getPaymentMethod());
        assertThat(parsed.getDiscountAmount()).isEqualByComparingTo(dto.getDiscountAmount());
        assertThat(parsed.getTip()).isEqualByComparingTo(dto.getTip());
        assertThat(parsed.getAmountPaid()).isEqualByComparingTo(dto.getAmountPaid());
        assertThat(parsed.getCurrency()).isEqualTo(dto.getCurrency());
        assertThat(parsed.getNotes()).isNull();
    }

    @Test
    void listReceiptDtoDeserializeTest() throws IOException {
        List<ListReceiptDto> parsed = listReceiptDtoJacksonTester.readObject(FileNames.LIST_RECEIPT_FILE);
        List<ListReceiptDto> list = ReceiptTestFactory.getListReceiptDtoList();

        assertThat(parsed.size()).isEqualTo(list.size());

        for (int i = 0; i < list.size(); i++) {
            ListReceiptDto parsedDto = parsed.get(i);
            ListReceiptDto dto = list.get(i);

            assertThat(parsedDto.getId()).isEqualTo(dto.getId());
            assertThat(parsedDto.getReceiptNumber()).isEqualTo(dto.getReceiptNumber());
            assertThat(parsedDto.getIssuedAt()).isEqualTo(dto.getIssuedAt());
            assertThat(parsedDto.getPaymentMethod()).isEqualTo(dto.getPaymentMethod());
            assertThat(parsedDto.getStatus()).isEqualTo(dto.getStatus());
            assertThat(parsedDto.getTotal()).isEqualByComparingTo(dto.getTotal());
            assertThat(parsedDto.getCurrency()).isEqualTo(dto.getCurrency());
        }
    }
}
