import 'package:flutter/material.dart';
import 'package:zynqly_mobile/core/theme/app_colors.dart';
import 'package:zynqly_mobile/core/theme/ride_colors.dart';

class AppTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      extensions: const [RideColors.light],
      colorScheme: ColorScheme.fromSeed(
        seedColor: AppColors.brandColor,
        primary: AppColors.brandColor,
        onPrimary: Colors.black,
        secondary: AppColors.deepBlack,
        surface: Colors.white,
      ),

      // NavigatonBar
      bottomNavigationBarTheme: BottomNavigationBarThemeData(
        type: BottomNavigationBarType.fixed,
        selectedItemColor: AppColors.brandColor,
        unselectedItemColor: Colors.grey,
        backgroundColor: Colors.white,
        elevation: 0.1, // shadow strength

        selectedLabelStyle: TextStyle(
          fontSize: 15.0,
          fontWeight: FontWeight.bold,
          letterSpacing: 0.5,
        ),

        unselectedLabelStyle: TextStyle(
          fontSize: 13.0,
          fontWeight: FontWeight.normal,
        ),
      ),

      // TextTheme
      textTheme: const TextTheme(
        headlineMedium: TextStyle(
          fontSize: 28.0,
          fontWeight: FontWeight.bold,
          color: Colors.black,
          letterSpacing: -0.5,
        ),

        titleLarge: TextStyle(
          fontSize: 18.0,
          fontWeight: FontWeight.w600,
          color: Colors.black87,
        ),
        bodyMedium: TextStyle(fontSize: 16.0, color: Colors.black54),
      ),
    );
  }
}
