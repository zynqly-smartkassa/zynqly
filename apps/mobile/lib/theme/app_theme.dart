import 'package:flutter/material.dart';

class AppColors {
  static const Color brandColor = Color(0xFFD97706);
  static const Color deepBlack = Color(0xFF121212);
  static const Color successGreen = Color(0xFF4CAF50);
}

class AppTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: AppColors.brandColor,
        primary: AppColors.brandColor,
        onPrimary: Colors.black,
        secondary: AppColors.deepBlack,
        surface: Colors.white,
      ),

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
    );
  }
}
