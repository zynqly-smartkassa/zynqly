// @Mario Shenouda
// bekommen die farben von app_colors,

import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';

class MapBackground extends StatelessWidget {
  const MapBackground({super.key});

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      painter: MapPainter(),
      size: Size.infinite,
    );
  }
}

class MapPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final backgroundPaint = Paint()..color = AppColors.mapBackground;
    canvas.drawRect(Rect.fromLTWH(0, 0, size.width, size.height), backgroundPaint);

    final roadPaint = Paint()
      ..color = AppColors.road.withOpacity(0.95)
      ..strokeWidth = 10
      ..strokeCap = StrokeCap.round;

    final buildingPaint = Paint()..color = AppColors.building.withOpacity(0.55);
    final parkPaint = Paint()..color = AppColors.park;
    final waterPaint = Paint()..color = AppColors.water;

    canvas.drawCircle(
      Offset(size.width - 10, 240),
      150,
      waterPaint,
    );

    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromLTWH(size.width * 0.20, size.height * 0.17, size.width * 0.30, 92),
        const Radius.circular(18),
      ),
      parkPaint,
    );

    final buildings = [
      Rect.fromLTWH(size.width * 0.32, size.height * 0.50, size.width * 0.12, 96),
      Rect.fromLTWH(size.width * 0.38, size.height * 0.50, size.width * 0.18, 96),
      Rect.fromLTWH(size.width * 0.64, size.height * 0.17, size.width * 0.20, 110),
      Rect.fromLTWH(size.width * 0.95, size.height * 0.28, size.width * 0.16, 90),
      Rect.fromLTWH(size.width * 0.54, size.height * 0.80, size.width * 0.18, 84),
    ];

    for (final rect in buildings) {
      canvas.drawRRect(
        RRect.fromRectAndRadius(rect, const Radius.circular(16)),
        buildingPaint,
      );
    }

    final roads = [
      [Offset(0, size.height * 0.37), Offset(size.width, size.height * 0.37)],
      [Offset(0, size.height * 0.57), Offset(size.width, size.height * 0.57)],
      [Offset(size.width * 0.43, 0), Offset(size.width * 0.43, size.height)],
      [Offset(size.width * 0.68, 0), Offset(size.width * 0.68, size.height)],
    ];

    for (final road in roads) {
      canvas.drawLine(road[0], road[1], roadPaint);
    }

    final blueDotPaint = Paint()..color = AppColors.blueDot;
    canvas.drawCircle(
      Offset(size.width * 0.77, size.height * 0.48),
      10,
      blueDotPaint,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}