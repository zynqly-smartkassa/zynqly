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
        selectedItemColor: AppColors.brandColor,
        unselectedItemColor: Colors.grey,
        backgroundColor: Colors.white,
        elevation: 8, // shadow strength
      ),
    );
  }
}
