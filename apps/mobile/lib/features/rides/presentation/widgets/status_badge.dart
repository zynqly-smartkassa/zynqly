import 'package:flutter/material.dart';
import 'package:zynqly_mobile/core/theme/app_spacing.dart';
import 'package:zynqly_mobile/core/theme/ride_colors.dart';
import 'package:zynqly_mobile/features/rides/data/models/ride.dart';

class StatusBadge extends StatelessWidget {
  const StatusBadge({super.key, required this.status});

  final RideStatus status;

  @override
  Widget build(BuildContext context) {
    final colors = Theme.of(context).extension<RideColors>()!;
    final tint = switch (status) {
      RideStatus.completed => colors.completed,
      RideStatus.pending => colors.pending,
      RideStatus.cancelled => colors.cancelled,
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
        style: Theme.of(context).textTheme.labelSmall?.copyWith(
          color: tint.foreground,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }
}
