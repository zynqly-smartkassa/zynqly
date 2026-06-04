import 'package:flutter/material.dart';
import 'package:zynqly_mobile/theme/app_theme.dart';
import 'package:zynqly_mobile/screens/root_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of the application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Zynqly Home Screen',
      theme: AppTheme.lightTheme,
      home: RootScreen(),
    );
  }
}
 