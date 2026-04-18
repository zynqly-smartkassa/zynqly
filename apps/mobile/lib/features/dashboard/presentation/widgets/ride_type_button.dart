// @Mario Shenouda

import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';

/// Toggle button used to select ride type.
class RideTypeButton extends StatelessWidget {
  final String title;
  final bool selected;
  final VoidCallback onTap;

  const RideTypeButton({
    super.key,
    required this.title,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Container(
        height: 44,
        decoration: BoxDecoration(
          color: selected
              ? AppColors.primaryAccent
              : AppColors.rideTypeUnselected,
          borderRadius: BorderRadius.circular(14),
        ),
        child: Center(child: Text(title)),
      ),
    );
  }
}