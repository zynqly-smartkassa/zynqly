package com.zynqly.backend.receipts;

import com.zynqly.backend.domain.receipt.Receipt;
import com.zynqly.backend.domain.receipt.RideType;
import com.zynqly.backend.domain.receipt.dto.ReceiptCreateDto;
import com.zynqly.backend.repository.ReceiptRepository;
import com.zynqly.backend.services.ipl.ReceiptServiceIpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

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

        Receipt saved = ReceiptTestFactory.getReceipt();

        when(repo.save(any(Receipt.class))).thenReturn(saved);

        Receipt createdReceipt = service.createReceipt(dto, ReceiptTestFactory.getDummy_user_id());

        assertThat(createdReceipt.getId()).isEqualTo(saved.getId());
        assertThat(createdReceipt.getUser_id()).isEqualTo(ReceiptTestFactory.getDummy_user_id());
        assertThat(createdReceipt.getRideType()).isEqualTo(RideType.BOTENFAHRT);
        assertThat(createdReceipt.getTaxRate()).isEqualByComparingTo(String.valueOf(0.20));
        verify(repo, times(1)).save(any(Receipt.class));
    }
}
