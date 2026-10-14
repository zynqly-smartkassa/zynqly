import 'package:zynqly_mobile/features/receipts/data/models/receipt_list_dto.dart';

String formatAmount(double amount, Currency currency) =>
    '${amount.toStringAsFixed(2)} ${currency.symbol}';

String formatDateTime(DateTime dateTime) {
  final local = dateTime.toLocal();
  String two(int value) => value.toString().padLeft(2, '0');
  return '${local.year}-${two(local.month)}-${two(local.day)}  '
      '${two(local.hour)}:${two(local.minute)}';
}
