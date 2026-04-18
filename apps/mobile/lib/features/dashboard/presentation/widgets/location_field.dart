// @Mario Shenouda

import 'package:flutter/material.dart';

/// Displays pickup or destination input field.
class LocationField extends StatelessWidget {
  final String label;
  final String value;

  const LocationField({
    super.key,
    required this.label,
    required this.value,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: const Color(0xFFE3DED6),
        borderRadius: BorderRadius.circular(14),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label),
          Text(value),
        ],
      ),
    );
  }
}