// @Mario Shenouda

import 'package:flutter/material.dart';
import 'ride_type_button.dart';
import 'location_field.dart';
import 'price_box.dart';
import '../../../../core/theme/app_colors.dart';

/// Bottom sheet that contains ride configuration UI.
import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';
import 'location_field.dart';
import 'price_box.dart';
import 'ride_type_button.dart';

class RideBottomSheet extends StatelessWidget {
  final bool isPassengerRide;
  final VoidCallback onPassengerSelected;
  final VoidCallback onCourierSelected;
  final VoidCallback onStartRide;

  final String pickupAddress;
  final String destinationAddress;
  final String basePrice;
  final String pricePerKm;
  final String pricePerMinute;

  const RideBottomSheet({
    super.key,
    required this.isPassengerRide,
    required this.onPassengerSelected,
    required this.onCourierSelected,
    required this.pickupAddress,
    required this.destinationAddress,
    required this.basePrice,
    required this.pricePerKm,
    required this.pricePerMinute,
    required this.onStartRide,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.fromLTRB(24, 10, 24, 26),
      decoration: const BoxDecoration(
        color: AppColors.bottomSheetBackground,
        borderRadius: BorderRadius.vertical(top: Radius.circular(30)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 54,
            height: 6,
            decoration: BoxDecoration(
              color: AppColors.textSecondary.withOpacity(0.45),
              borderRadius: BorderRadius.circular(99),
            ),
          ),
          const SizedBox(height: 22),
          Row(
            children: [
              Expanded(
                child: RideTypeButton(
                  title: 'Passagierfahrt',
                  selected: isPassengerRide,
                  onTap: onPassengerSelected,
                  icon: Icons.person_outline,
                ),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: RideTypeButton(
                  title: 'Botenfahrt',
                  selected: !isPassengerRide,
                  onTap: onCourierSelected,
                  icon: Icons.inventory_2_outlined,
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          LocationField(
            label: 'ABHOLUNG',
            value: pickupAddress,
            dotColor: AppColors.pickupDot,
          ),
          const SizedBox(height: 14),
          LocationField(
            label: 'ZIEL',
            value: destinationAddress,
            dotColor: AppColors.destinationDot,
          ),
          const SizedBox(height: 18),
          Row(
            children: [
              Expanded(
                child: PriceBox(
                  title: 'Grundpreis',
                  value: basePrice,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: PriceBox(
                  title: 'Pro km',
                  value: pricePerKm,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: PriceBox(
                  title: 'Pro Min',
                  value: pricePerMinute,
                ),
              ),
            ],
          ),
          const SizedBox(height: 22),
          SizedBox(
            width: double.infinity,
            height: 70,
            child: ElevatedButton.icon(
              onPressed: onStartRide,
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primaryAccent,
                foregroundColor: Colors.white,
                elevation: 0,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(22),
                ),
              ),
              icon: const Icon(Icons.play_arrow_rounded, size: 26),
              label: const Text(
                'Fahrt starten',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}