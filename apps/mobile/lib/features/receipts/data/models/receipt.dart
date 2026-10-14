import 'package:zynqly_mobile/features/receipts/data/models/receipt_list_dto.dart';

/// Ride type as used by the receipt endpoints (`RideType` in the OpenAPI spec).
enum ReceiptRideType {
  errand('ERRANDTRIP'),
  passenger('PASSENGERTRIP');

  const ReceiptRideType(this.apiValue);

  final String apiValue;

  static ReceiptRideType fromApi(String value) => values.firstWhere(
    (type) => type.apiValue == value,
    orElse: () => throw FormatException('Unknown receipt ride type: $value'),
  );
}

/// A single receipt with all details, see `Receipt` in the OpenAPI spec.
class Receipt {
  const Receipt({
    required this.id,
    required this.rideId,
    required this.userId,
    required this.issuedAt,
    required this.paymentMethod,
    required this.status,
    required this.subtotal,
    required this.taxRate,
    required this.taxAmount,
    required this.discountAmount,
    required this.total,
    required this.tip,
    required this.amountPaid,
    required this.change,
    required this.currency,
    required this.receiptNumber,
    required this.rideType,
    this.notes,
  });

  final int id;
  final int rideId;
  final int userId;
  final DateTime issuedAt;
  final PaymentMethod paymentMethod;
  final PaymentStatus status;

  /// Monetary values are only used for display, so `double` is sufficient.
  final double subtotal;

  /// Tax rate as a fraction, e.g. `0.19` for 19 %.
  final double taxRate;
  final double taxAmount;
  final double discountAmount;
  final double total;
  final double tip;
  final double amountPaid;
  final double change;
  final Currency currency;
  final String receiptNumber;
  final String? notes;
  final ReceiptRideType rideType;

  factory Receipt.fromJson(Map<String, dynamic> json) {
    return Receipt(
      id: json['id'] as int,
      rideId: json['ride_id'] as int,
      userId: json['user_id'] as int,
      issuedAt: DateTime.parse(json['issuedAt'] as String),
      paymentMethod: PaymentMethod.fromApi(json['paymentMethod'] as String),
      status: PaymentStatus.fromApi(json['status'] as String),
      subtotal: (json['subtotal'] as num).toDouble(),
      taxRate: (json['taxRate'] as num).toDouble(),
      taxAmount: (json['taxAmount'] as num).toDouble(),
      discountAmount: (json['discountAmount'] as num).toDouble(),
      total: (json['total'] as num).toDouble(),
      tip: (json['tip'] as num).toDouble(),
      amountPaid: (json['amountPaid'] as num).toDouble(),
      change: (json['change'] as num).toDouble(),
      currency: Currency.fromApi(json['currency'] as String),
      receiptNumber: json['receiptNumber'] as String,
      notes: json['notes'] as String?,
      rideType: ReceiptRideType.fromApi(json['rideType'] as String),
    );
  }
}
