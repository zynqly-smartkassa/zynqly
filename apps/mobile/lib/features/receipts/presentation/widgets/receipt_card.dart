import 'package:flutter/material.dart';
import 'package:zynqly_mobile/core/theme/app_spacing.dart';
import 'package:zynqly_mobile/features/receipts/data/models/receipt_list_dto.dart';
import 'package:zynqly_mobile/features/receipts/presentation/widgets/payment_status_badge.dart';

class ReceiptCard extends StatelessWidget {
  const ReceiptCard({super.key, required this.receipt});

  final ReceiptListDto receipt;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Card(
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppRadius.card),
        side: BorderSide(color: theme.colorScheme.outlineVariant),
      ),
      margin: const EdgeInsets.symmetric(vertical: AppSpacing.sm),
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.md),
        child: Row(
          children: [
            CircleAvatar(
              backgroundColor: theme.colorScheme.secondaryContainer,
              child: Icon(
                _paymentIcon(receipt.paymentMethod),
                color: theme.colorScheme.onSecondaryContainer,
              ),
            ),
            const SizedBox(width: AppSpacing.lg),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    _formatAmount(receipt.total, receipt.currency),
                    style: TextStyle(
                      fontSize: 26,
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: AppSpacing.xs),
                  Text(
                    receipt.receiptNumber,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: theme.textTheme.bodyMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Row(
                    children: [
                      Text(
                        _formatDateTime(receipt.issuedAt),
                        style: theme.textTheme.bodySmall?.copyWith(
                          color: theme.colorScheme.onSurfaceVariant,
                        ),
                      ),
                      const SizedBox(width: AppSpacing.md),
                      PaymentStatusBadge(status: receipt.status),
                    ],
                  ),
                ],
              ),
            ),
            Icon(
              Icons.chevron_right,
              color: theme.colorScheme.outline,
              size: 32,
            ),
          ],
        ),
      ),
    );
  }

  static IconData _paymentIcon(PaymentMethod method) => switch (method) {
    PaymentMethod.cash => Icons.payments_outlined,
    PaymentMethod.card => Icons.credit_card_outlined,
    PaymentMethod.app => Icons.smartphone_outlined,
    PaymentMethod.other => Icons.receipt_long_outlined,
  };

  static String _formatAmount(double amount, Currency currency) =>
      '${amount.toStringAsFixed(2)} ${currency.symbol}';

  static String _formatDateTime(DateTime dateTime) {
    final local = dateTime.toLocal();
    String two(int value) => value.toString().padLeft(2, '0');
    return '${local.year}-${two(local.month)}-${two(local.day)}  '
        '${two(local.hour)}:${two(local.minute)}';
  }
}
