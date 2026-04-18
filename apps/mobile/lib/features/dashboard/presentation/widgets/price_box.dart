// @Mario Shenouda

import 'package:flutter/material.dart';

/// Small card showing pricing information.
class PriceBox extends StatelessWidget {
  final String title;
  final String value;

  const PriceBox({
    super.key,
    required this.title,
    required this.value,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 60,
      decoration: BoxDecoration(
        color: const Color(0xFFEAE5DE),
        borderRadius: BorderRadius.circular(14),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(title),
          Text(value),
        ],
      ),
    );
  }
}