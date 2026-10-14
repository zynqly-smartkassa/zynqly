enum PaymentMethod {
  cash('CASH'),
  card('CARD'),
  app('APP'),
  other('OTHER');

  const PaymentMethod(this.apiValue);

  final String apiValue;

  static PaymentMethod fromApi(String value) => values.firstWhere(
    (method) => method.apiValue == value,
    orElse: () => throw FormatException('Unknown payment method: $value'),
  );
}

enum PaymentStatus {
  pending('PENDING'),
  paid('PAID'),
  refunded('REFUNDED'),
  cancelled('CANCELLED');

  const PaymentStatus(this.apiValue);

  final String apiValue;

  static PaymentStatus fromApi(String value) => values.firstWhere(
    (status) => status.apiValue == value,
    orElse: () => throw FormatException('Unknown payment status: $value'),
  );
}

enum Currency {
  eur('EUR', '€');

  const Currency(this.apiValue, this.symbol);

  final String apiValue;
  final String symbol;

  static Currency fromApi(String value) => values.firstWhere(
    (currency) => currency.apiValue == value,
    orElse: () => throw FormatException('Unknown currency: $value'),
  );
}

/// A single entry of the receipt list, see `ReceiptListDto` in the OpenAPI spec.
class ReceiptListDto {
  const ReceiptListDto({
    required this.id,
    required this.receiptNumber,
    required this.issuedAt,
    required this.paymentMethod,
    required this.status,
    required this.total,
    required this.currency,
  });

  final int id;
  final String receiptNumber;
  final DateTime issuedAt;
  final PaymentMethod paymentMethod;
  final PaymentStatus status;

  /// Total in [currency]. Only used for display, so `double` is sufficient.
  final double total;
  final Currency currency;

  factory ReceiptListDto.fromJson(Map<String, dynamic> json) {
    return ReceiptListDto(
      id: json['id'] as int,
      receiptNumber: json['receiptNumber'] as String,
      issuedAt: DateTime.parse(json['issuedAt'] as String),
      paymentMethod: PaymentMethod.fromApi(json['paymentMethod'] as String),
      status: PaymentStatus.fromApi(json['status'] as String),
      total: (json['total'] as num).toDouble(),
      currency: Currency.fromApi(json['currency'] as String),
    );
  }
}
