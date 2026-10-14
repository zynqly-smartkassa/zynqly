import 'package:flutter/material.dart';
import 'package:zynqly_mobile/core/theme/app_spacing.dart';
import 'package:zynqly_mobile/features/receipts/data/dummy_receipt_details.dart';
import 'package:zynqly_mobile/features/receipts/data/models/receipt.dart';
import 'package:zynqly_mobile/features/receipts/presentation/receipt_formatters.dart';
import 'package:zynqly_mobile/features/receipts/presentation/widgets/payment_method_style.dart';
import 'package:zynqly_mobile/features/receipts/presentation/widgets/payment_status_badge.dart';

class ReceiptDetailScreen extends StatelessWidget {
  const ReceiptDetailScreen({super.key, required this.receiptId});

  final int receiptId;

  @override
  Widget build(BuildContext context) {
    // Looks up dummy data for now, to be replaced by a request to the backend.
    final receipt = findDummyReceipt(receiptId);

    return Scaffold(
      appBar: AppBar(title: const Text('Rechnung')),
      body: receipt == null
          ? const Center(child: Text('Rechnung nicht gefunden'))
          : ListView(
              padding: const EdgeInsets.all(AppSpacing.md),
              children: [
                _Header(receipt: receipt),
                _Section(
                  title: 'Details',
                  rows: [
                    _Row('Zahlungsart', receipt.paymentMethod.label),
                    _Row('Fahrtart', switch (receipt.rideType) {
                      ReceiptRideType.passenger => 'Personenfahrt',
                      ReceiptRideType.errand => 'Botenfahrt',
                    }),
                    _Row('Fahrt-Nr.', '#${receipt.rideId}'),
                    _Row('Ausgestellt', formatDateTime(receipt.issuedAt)),
                  ],
                ),
                _Section(
                  title: 'Kostenaufstellung',
                  rows: [
                    _Row(
                      'Zwischensumme',
                      formatAmount(receipt.subtotal, receipt.currency),
                    ),
                    _Row(
                      'MwSt. (${(receipt.taxRate * 100).toStringAsFixed(0)} %)',
                      formatAmount(receipt.taxAmount, receipt.currency),
                    ),
                    if (receipt.discountAmount > 0)
                      _Row(
                        'Rabatt',
                        '- ${formatAmount(receipt.discountAmount, receipt.currency)}',
                      ),
                    _Row(
                      'Gesamt',
                      formatAmount(receipt.total, receipt.currency),
                      emphasized: true,
                    ),
                    _Row(
                      'Trinkgeld',
                      formatAmount(receipt.tip, receipt.currency),
                    ),
                    _Row(
                      'Bezahlt',
                      formatAmount(receipt.amountPaid, receipt.currency),
                    ),
                    _Row(
                      'Rückgeld',
                      formatAmount(receipt.change, receipt.currency),
                    ),
                  ],
                ),
                if (receipt.notes != null && receipt.notes!.isNotEmpty)
                  _Section(title: 'Notiz', rows: [_Row.note(receipt.notes!)]),
              ],
            ),
    );
  }
}

class _Header extends StatelessWidget {
  const _Header({required this.receipt});

  final Receipt receipt;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return _SectionCard(
      child: Row(
        children: [
          CircleAvatar(
            radius: 28,
            backgroundColor: theme.colorScheme.secondaryContainer,
            child: Icon(
              receipt.paymentMethod.icon,
              color: receipt.paymentMethod.color,
              size: 28,
            ),
          ),
          const SizedBox(width: AppSpacing.lg),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  formatAmount(receipt.total, receipt.currency),
                  style: theme.textTheme.headlineMedium?.copyWith(
                    fontSize: 32,
                    fontWeight: FontWeight.bold,
                    color: theme.colorScheme.onSurface,
                  ),
                ),
                const SizedBox(height: AppSpacing.xs),
                Text(
                  receipt.receiptNumber,
                  style: theme.textTheme.bodyMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: AppSpacing.xs),
                Row(
                  children: [
                    Flexible(
                      child: Text(
                        formatDateTime(receipt.issuedAt),
                        style: theme.textTheme.bodySmall?.copyWith(
                          color: theme.colorScheme.onSurfaceVariant,
                        ),
                      ),
                    ),
                    const SizedBox(width: AppSpacing.md),
                    PaymentStatusBadge(status: receipt.status),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

/// Bordered card using the same style as the receipt card of the list.
class _SectionCard extends StatelessWidget {
  const _SectionCard({required this.child});

  final Widget child;

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
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: child,
      ),
    );
  }
}

class _Section extends StatelessWidget {
  const _Section({required this.title, required this.rows});

  final String title;
  final List<_Row> rows;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return _SectionCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: theme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: AppSpacing.sm),
          for (final row in rows) row,
        ],
      ),
    );
  }
}

class _Row extends StatelessWidget {
  const _Row(this.label, this.value, {this.emphasized = false})
    : isNote = false;

  /// A full-width text without a label.
  const _Row.note(this.value) : label = '', emphasized = false, isNote = true;

  final String label;
  final String value;
  final bool emphasized;
  final bool isNote;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    if (isNote) {
      return Padding(
        padding: const EdgeInsets.symmetric(vertical: AppSpacing.xs),
        child: Text(value, style: theme.textTheme.bodyMedium),
      );
    }

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: AppSpacing.xs),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: theme.textTheme.bodyMedium?.copyWith(
              color: emphasized
                  ? theme.colorScheme.onSurface
                  : theme.colorScheme.onSurfaceVariant,
              fontWeight: emphasized ? FontWeight.bold : null,
            ),
          ),
          const SizedBox(width: AppSpacing.md),
          Text(
            value,
            style: theme.textTheme.bodyMedium?.copyWith(
              fontWeight: emphasized ? FontWeight.bold : FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }
}
