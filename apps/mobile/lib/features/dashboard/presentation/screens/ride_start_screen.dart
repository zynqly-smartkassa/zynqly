// @Mario Shenouda
// die gleich wie die ride_start_screen, aber hier wird dann die map gezeichnet, 
// damit man die map nicht in jedem screen neu zeichnen muss, 
// sondern nur hier und dann in den anderen screens einfach die map als hintergrund nutzen kann

import 'package:flutter/material.dart';
import '../painters/map_painter.dart';
import '../widgets/ride_bottom_sheet.dart';

class RideStartScreen extends StatefulWidget {
  const RideStartScreen({super.key});

  @override
  State<RideStartScreen> createState() => _RideStartScreenState();
}

class _RideStartScreenState extends State<RideStartScreen> {
  bool isPassengerRide = true;

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
          const MapBackground(),
          SafeArea(
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.fromLTRB(16, 12, 16, 0),
                  child: Row(
                    children: [
                      _topCircleButton(Icons.arrow_back_ios_new),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Container(
                          height: 44,
                          padding: const EdgeInsets.symmetric(horizontal: 14),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(16),
                            boxShadow: const [
                              BoxShadow(
                                color: Colors.black12,
                                blurRadius: 8,
                                offset: Offset(0, 2),
                              ),
                            ],
                          ),
                          child: const Row(
                            children: [
                              Icon(
                                Icons.location_on_outlined,
                                color: Colors.grey,
                                size: 18,
                              ),
                              SizedBox(width: 8),
                              Text(
                                'Ziel eingeben...',
                                style: TextStyle(
                                  color: Colors.grey,
                                  fontSize: 15,
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
      width: 38,
      height: 38,
      decoration: const BoxDecoration(
        color: Colors.white,
        shape: BoxShape.circle,
        boxShadow: [
          BoxShadow(
            color: Colors.black12,
            blurRadius: 8,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: Icon(icon, size: 18, color: Colors.black87),
    );
  }
}