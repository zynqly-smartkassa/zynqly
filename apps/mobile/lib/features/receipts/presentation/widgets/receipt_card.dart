import 'package:flutter/material.dart';
import 'package:zynqly_mobile/core/theme/app_spacing.dart';
import 'package:zynqly_mobile/features/receipts/data/models/receipt_list_dto.dart';
import 'package:zynqly_mobile/features/receipts/presentation/receipt_formatters.dart';
import 'package:zynqly_mobile/features/receipts/presentation/screens/receipt_detail_screen.dart';
import 'package:zynqly_mobile/features/receipts/presentation/widgets/payment_method_style.dart';
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
                receipt.paymentMethod.icon,
                color: receipt.paymentMethod.color,
              ),
            ),
            const SizedBox(width: AppSpacing.lg),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    formatAmount(receipt.total, receipt.currency),
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
                        formatDateTime(receipt.issuedAt),
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
            IconButton(
              onPressed: () => Navigator.of(context).push(
                MaterialPageRoute<void>(
                  builder: (_) => ReceiptDetailScreen(receiptId: receipt.id),
                ),
              ),
              icon: Icon(
                Icons.chevron_right,
                color: theme.colorScheme.outline,
                size: 32,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
