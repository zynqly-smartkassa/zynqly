// @Mario Shenouda

import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';

/// Toggle button used to select ride type.

class RideTypeButton extends StatelessWidget {
  final String title;
  final bool selected;
  final IconData? icon;
  final VoidCallback onTap;

  const RideTypeButton({
    super.key,
    required this.title,
    required this.selected,
    required this.onTap,
    this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: 68,
        decoration: BoxDecoration(
          color: selected
              ? AppColors.primaryAccent
              : AppColors.rideTypeUnselected,
          borderRadius: BorderRadius.circular(22),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (icon != null) ...[
              Icon(
                icon,
                size: 22,
                color: selected
                    ? AppColors.primaryAccentDarkText
                    : AppColors.textSecondary,
              ),
              const SizedBox(width: 10),
            ],
            Flexible(
              child: FittedBox(
                fit: BoxFit.scaleDown,
                child: Text(
                  title,
                  style: TextStyle(
                    color: selected
                        ? AppColors.primaryAccentDarkText
                        : AppColors.textPrimary,
                    fontSize: 17,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
