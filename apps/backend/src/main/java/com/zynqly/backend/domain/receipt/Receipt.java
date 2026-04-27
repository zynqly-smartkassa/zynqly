package com.zynqly.backend.domain.receipt;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Generated;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "receipts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Receipt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int ride_id;
    private int user_id;

    @CreationTimestamp
    private LocalDateTime issuedAt;
    private PaymentMethod paymentMethod;
    private PaymentStatus status;

    private BigDecimal subtotal;
    private BigDecimal taxRate;
    private BigDecimal taxAmount;
    private BigDecimal discountAmount;
    private BigDecimal total;
    private BigDecimal tip;
    private BigDecimal amountPaid;
    private BigDecimal change;
    private Currency currency;
    private String receiptNumber;
    private String notes;
    private RideType rideType;
}
