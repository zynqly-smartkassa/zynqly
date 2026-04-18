// hier nur die matrieal app, damit man die theme daten zentral hat und nicht in jedem screen neu angeben muss
// @Mario Shenouda
import 'package:flutter/material.dart';
import '../core/theme/app_colors.dart';
import '../features/dashboard/presentation/screens/ride_start_screen.dart';

class ZynqlyApp extends StatelessWidget {
  const ZynqlyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Zynqly Ride Flow', // Placeholder title, könnte später angepasst werden
      theme: ThemeData(
        useMaterial3: true,
        scaffoldBackgroundColor: AppColors.scaffoldBackground,
        fontFamily: 'SF Pro Display',
      ),
      home: const RideStartScreen(),
    );
  }
}