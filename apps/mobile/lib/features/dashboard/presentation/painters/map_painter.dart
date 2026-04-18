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
      child: Container(),
    );
  }
}

class MapPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final backgroundPaint = Paint()..color = AppColors.mapBackground;
    canvas.drawRect(
      Rect.fromLTWH(0, 0, size.width, size.height),
      backgroundPaint,
    );

    final roadPaint = Paint()
      ..color = Colors.white.withOpacity(0.85)
      ..strokeWidth = 7;

    final buildingPaint = Paint()..color = AppColors.building;
    final parkPaint = Paint()..color = AppColors.park;
    final waterPaint = Paint()..color = AppColors.water;

    canvas.drawCircle(
      Offset(size.width - 20, 180),
      130,
      waterPaint,
    );

    canvas.drawRRect(
      RRect.fromRectAndRadius(
        const Rect.fromLTWH(80, 110, 140, 85),
        const Radius.circular(8),
      ),
      parkPaint,
    );

    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromLTWH(size.width - 160, size.height - 150, 150, 70),
        const Radius.circular(8),
      ),
      parkPaint,
    );

    final buildings = [
      const Rect.fromLTWH(125, 310, 115, 90),
      const Rect.fromLTWH(250, 110, 80, 70),
      const Rect.fromLTWH(370, 165, 95, 65),
      const Rect.fromLTWH(480, 220, 70, 100),
      const Rect.fromLTWH(420, 465, 70, 88),
      const Rect.fromLTWH(210, 495, 120, 110),
      const Rect.fromLTWH(640, 120, 90, 78),
      const Rect.fromLTWH(640, 460, 105, 88),
    ];

    for (final rect in buildings) {
      canvas.drawRRect(
        RRect.fromRectAndRadius(rect, const Radius.circular(6)),
        buildingPaint,
      );
    }

    final roads = [
      [Offset(0, 275), Offset(size.width, 275)],
      [Offset(0, 420), Offset(size.width, 420)],
      [Offset(0, 530), Offset(size.width, 530)],
      [Offset(165, 0), Offset(165, size.height)],
      [Offset(265, 0), Offset(265, size.height)],
      [Offset(430, 0), Offset(430, size.height)],
      [Offset(625, 0), Offset(625, size.height)],
    ];

    for (final road in roads) {
      canvas.drawLine(road[0], road[1], roadPaint);
    }

    final routePaint = Paint()
      ..color = AppColors.route
      ..strokeWidth = 4;

    const riderPoint = Offset(165, 530);
    canvas.drawLine(riderPoint, const Offset(250, 585), routePaint);

    final blueDot = Paint()..color = AppColors.blueDot;
    final whiteDot = Paint()..color = Colors.white;

    canvas.drawCircle(riderPoint, 8, blueDot);
    canvas.drawCircle(riderPoint, 4, whiteDot);

    canvas.drawCircle(const Offset(300, 355), 5, blueDot);
    canvas.drawCircle(const Offset(520, 575), 5, blueDot);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}