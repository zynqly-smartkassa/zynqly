import 'package:flutter/material.dart';
import 'package:zynqly_mobile/app/root_screen.dart';
import 'package:zynqly_mobile/core/theme/app_theme.dart';

class ZynqlyApp extends StatelessWidget {
  const ZynqlyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Zynqly',
      theme: AppTheme.lightTheme,
      home: const RootScreen(),
    );
  }
}
