// @Mario Shenouda
// die gleich wie die ride_start_screen, aber hier wird dann die map gezeichnet, 
// damit man die map nicht in jedem screen neu zeichnen muss, 
// sondern nur hier und dann in den anderen screens einfach die map als hintergrund nutzen kann

import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';
import '../painters/map_painter.dart';
import '../widgets/ride_bottom_sheet.dart';

class RideStartScreen extends StatefulWidget {
  const RideStartScreen({super.key});

  @override
  State<RideStartScreen> createState() => _RideStartScreenState();
}

class _RideStartScreenState extends State<RideStartScreen> {
  bool isPassengerRide = true;

  final String pickupAddress = 'Graz HauptBahnhof, graz';
  final String destinationAddress = 'Ziel eingeben oder auf Karte tippen';
  final String basePrice = '3,90 €';
  final String pricePerKm = '2,30 €';
  final String pricePerMinute = '0,50 €';

  void _selectPassengerRide() {
    setState(() {
      isPassengerRide = true;
    });
  }

  void _selectCourierRide() {
    setState(() {
      isPassengerRide = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          const Positioned.fill(child: MapBackground()),
          SafeArea(
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.fromLTRB(18, 18, 18, 0),
                  child: Row(
                    children: [
                      _topCircleButton(Icons.arrow_back_ios_new_rounded),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Container(
                          height: 66,
                          padding: const EdgeInsets.symmetric(horizontal: 20),
                          decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.96),
                            borderRadius: BorderRadius.circular(24),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.08),
                                blurRadius: 16,
                                offset: const Offset(0, 4),
                              ),
                            ],
                          ),
                          child: const Row(
                            children: [
                              Icon(
                                Icons.location_on_outlined,
                                color: AppColors.textSecondary,
                                size: 28,
                              ),
                              SizedBox(width: 12),
                              Text(
                                'Ziel eingeben...',
                                style: TextStyle(
                                  color: AppColors.textSecondary,
                                  fontSize: 18,
                                  fontWeight: FontWeight.w400,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const Spacer(),
                RideBottomSheet(
                  isPassengerRide: isPassengerRide,
                  onPassengerSelected: _selectPassengerRide,
                  onCourierSelected: _selectCourierRide,
                  pickupAddress: pickupAddress,
                  destinationAddress: destinationAddress,
                  basePrice: basePrice,
                  pricePerKm: pricePerKm,
                  pricePerMinute: pricePerMinute,
                  onStartRide: () {},
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _topCircleButton(IconData icon) {
    return Container(
      width: 62,
      height: 62,
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.96),
        shape: BoxShape.circle,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.08),
            blurRadius: 16,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Icon(
        icon,
        size: 28,
        color: AppColors.textPrimary,
      ),
    );
  }
}