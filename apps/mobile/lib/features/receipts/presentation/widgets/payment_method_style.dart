import 'package:flutter/material.dart';
import 'package:zynqly_mobile/features/receipts/data/models/receipt_list_dto.dart';

/// Icon, color and label of a payment method, shared by the receipt card and
/// the receipt detail screen.
extension PaymentMethodStyle on PaymentMethod {
  IconData get icon => switch (this) {
    PaymentMethod.cash => Icons.payments_outlined,
    PaymentMethod.card => Icons.credit_card_outlined,
    PaymentMethod.app => Icons.smartphone_outlined,
    PaymentMethod.other => Icons.receipt_long_outlined,
  };

  Color get color => switch (this) {
    PaymentMethod.cash => Colors.green,
    PaymentMethod.card => Colors.yellow.shade900,
    PaymentMethod.app => Colors.black,
    PaymentMethod.other => Colors.indigo,
  };

  String get label => switch (this) {
    PaymentMethod.cash => 'Bar',
    PaymentMethod.card => 'Karte',
    PaymentMethod.app => 'App',
    PaymentMethod.other => 'Sonstige',
  };
}
