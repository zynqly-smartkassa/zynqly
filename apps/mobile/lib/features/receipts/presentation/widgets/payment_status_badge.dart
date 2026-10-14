import 'package:flutter/material.dart';
import 'package:zynqly_mobile/core/theme/app_spacing.dart';
import 'package:zynqly_mobile/core/theme/ride_colors.dart';
import 'package:zynqly_mobile/features/receipts/data/models/receipt_list_dto.dart';

class PaymentStatusBadge extends StatelessWidget {
  const PaymentStatusBadge({super.key, required this.status});

  final PaymentStatus status;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colors = theme.extension<RideColors>()!;
    final tint = switch (status) {
      PaymentStatus.paid => colors.completed,
      PaymentStatus.pending => colors.pending,
      PaymentStatus.cancelled => colors.cancelled,
      PaymentStatus.refunded => Tint(
        foreground: theme.colorScheme.onSurfaceVariant,
        background: theme.colorScheme.surfaceContainerHighest,
      ),
    };

    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.sm,
        vertical: 2,
      ),
      decoration: BoxDecoration(
        color: tint.background,
        borderRadius: BorderRadius.circular(AppRadius.badge),
      ),
      child: Text(
        status.name,
        style: theme.textTheme.labelSmall?.copyWith(
          color: tint.foreground,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }
}
