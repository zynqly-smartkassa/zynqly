// @Mario Shenouda

import 'package:flutter/material.dart';
import 'ride_type_button.dart';
import 'location_field.dart';
import 'price_box.dart';
import '../../../../core/theme/app_colors.dart';

/// Bottom sheet that contains ride configuration UI.
class RideBottomSheet extends StatelessWidget {
  final bool isPassengerRide;
  final VoidCallback onPassengerSelected;
  final VoidCallback onCourierSelected;

  const RideBottomSheet({
    super.key,
    required this.isPassengerRide,
    required this.onPassengerSelected,
    required this.onCourierSelected,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: const BoxDecoration(
        color: AppColors.bottomSheetBackground,
        borderRadius: BorderRadius.vertical(top: Radius.circular(22)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            children: [
              Expanded(
                child: RideTypeButton(
                  title: 'Passagierfahrt',
                  selected: isPassengerRide,
                  onTap: onPassengerSelected,
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: RideTypeButton(
                  title: 'Botenfahrt',
                  selected: !isPassengerRide,
                  onTap: onCourierSelected,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          const LocationField(label: 'ABHOLUNG', value: 'Startpunkt'),
          const LocationField(label: 'ZIEL', value: 'Ziel eingeben'),
          const SizedBox(height: 12),
          const Row(
            children: [
              Expanded(child: PriceBox(title: 'Grundpreis', value: '3,90 €')),
              SizedBox(width: 10),
              Expanded(child: PriceBox(title: 'Pro km', value: '2,30 €')),
            ],
          ),
        ],
      ),
    );
  }
}