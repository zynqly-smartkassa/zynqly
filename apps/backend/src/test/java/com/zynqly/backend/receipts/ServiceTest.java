package com.zynqly.backend.receipts;

import com.zynqly.backend.domain.receipt.PaymentStatus;
import com.zynqly.backend.domain.receipt.Receipt;
import com.zynqly.backend.domain.receipt.RideType;
import com.zynqly.backend.domain.receipt.dto.ReceiptCreateDto;
import com.zynqly.backend.repository.ReceiptRepository;
import com.zynqly.backend.services.ipl.ReceiptServiceIpl;
import com.zynqly.backend.services.util.receipt.ReceiptCalculator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ServiceTest {
    @Mock
    private ReceiptRepository repo;

    @InjectMocks
    private ReceiptServiceIpl service;

    @Test
    void create_shouldReturnDetailDto() {
        ReceiptCreateDto dto = ReceiptTestFactory.getRECEIPT_CREATE_DTO();

        ArgumentCaptor<Receipt> captor = ArgumentCaptor.forClass(Receipt.class);

        Receipt mockUpReceipt = ReceiptTestFactory.getReceipt();
        when(repo.save(any(Receipt.class))).thenReturn(mockUpReceipt);
        service.createReceipt(dto, ReceiptTestFactory.getDummy_user_id());
        verify(repo, times(1)).save(any(Receipt.class));
        verify(repo).save(captor.capture());

        Receipt receiptCreated = captor.getValue();

        // another values to check using chaining ReceiptCalculator Methods
        BigDecimal expectedTaxRate = ReceiptCalculator.calculateTaxRate(dto.getRideType());
        BigDecimal expectedTaxAmount = ReceiptCalculator.calculateTaxAmount(dto.getSubtotal(), ReceiptCalculator.calculateTaxRate(dto.getRideType()));
        BigDecimal expectedTotal = ReceiptCalculator.calculateTotal(dto.getSubtotal(), expectedTaxAmount, dto.getDiscountAmount());


        assertThat(receiptCreated.getRideType()).isEqualTo(dto.getRideType());
        assertThat(receiptCreated.getRide_id()).isEqualTo(dto.getRide_id());
        assertThat(receiptCreated.getNotes()).isNull();
        assertThat(receiptCreated.getAmountPaid()).isEqualTo(dto.getAmountPaid());
        assertThat(receiptCreated.getTaxRate()).isEqualTo(expectedTaxRate);
        assertThat(receiptCreated.getTaxAmount()).isEqualTo(ReceiptCalculator.calculateTaxAmount(dto.getSubtotal(), dto.getRideType()));
        assertThat(receiptCreated.getTaxAmount()).isEqualTo(expectedTaxAmount);
        assertThat(receiptCreated.getTotal()).isEqualTo(ReceiptCalculator.calculateTotal(dto.getSubtotal(), dto.getRideType(), dto.getDiscountAmount()));
        assertThat(receiptCreated.getTotal()).isEqualTo(expectedTotal);
        assertThat(receiptCreated.getChange()).isEqualByComparingTo(
                ReceiptCalculator.calculateChange(
                        ReceiptCalculator.calculateTotal(dto.getSubtotal(), dto.getRideType(), dto.getDiscountAmount()), dto.getAmountPaid()));
        assertThat(receiptCreated.getChange()).isEqualByComparingTo(ReceiptCalculator.calculateChange(expectedTotal, dto.getAmountPaid()));
        assertThat(receiptCreated.getSubtotal()).isEqualTo(dto.getSubtotal());
        assertThat(receiptCreated.getCurrency()).isEqualTo(dto.getCurrency());
        assertThat(receiptCreated.getDiscountAmount()).isEqualTo(dto.getDiscountAmount());
        assertThat(receiptCreated.getTip()).isEqualTo(dto.getTip());
        assertThat(receiptCreated.getUser_id()).isEqualTo(ReceiptTestFactory.getDummy_user_id());
        assertThat(receiptCreated.getStatus()).isEqualTo(PaymentStatus.PAID);
    }
}
