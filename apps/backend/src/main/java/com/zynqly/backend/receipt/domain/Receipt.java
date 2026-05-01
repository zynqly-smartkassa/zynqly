package com.zynqly.backend.receipt.domain;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "receipts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Receipt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int ride_id;
    private int user_id;

    @CreationTimestamp
    private LocalDateTime issuedAt;
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    @Min(value = 0, message = "Subtotal must be greater than 0")
    private BigDecimal subtotal;
    private BigDecimal taxRate;
    private BigDecimal taxAmount;
    private BigDecimal discountAmount;
    @Min(value = 0, message = "Total must be greater than 0")
    private BigDecimal total;
    private BigDecimal tip;
    @Min(value = 0, message = "Amount paid must be greater than 0")
    private BigDecimal amountPaid;
    private BigDecimal change;
    @Enumerated(EnumType.STRING)
    private Currency currency;
    private String receiptNumber;
    @Nullable
    private String notes;
    @Enumerated(EnumType.STRING)
    private RideType rideType;

    public static String createReceiptNumber() {
        return "REC-" + LocalDateTime.now().getYear() + "-" + System.currentTimeMillis();
    }
}
