import 'package:flutter/material.dart';

void main() {
  runApp(const SmartKassa());
}

class SmartKassa extends StatelessWidget {
  const SmartKassa({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Smart Kassa',
      theme: ThemeData(
        
        useMaterial3: true,
        scaffoldBackgroundColor: Colors(0xfff2EEE8),
      ),
      home: const RideStartScreen(),
    );
  }
}

class RideStartScreen extends StatefulWidget {
  const RideStartScreen({super.key});

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  @override
  State<RideStartScreen> createState() => _RideStartScreenState();
}

class _RideStartScreenState extends State<RideStartScreen> {
  bool isPassengerRide = true;
  
  @override
  widget build(BuildContext context){
    return Scaffold(
      body: Stack(
        children:[
          const MapBackground(),
          safeArea(
            child: column(
              children:[
                padding(
                  padding: const EdgeInsets.formaLTRB(16,12,16,0),
                  child: Row(
                    children:[
                      _topCircleButton(Icons.arrow_back_ios_new),
                      const SizedBox(width:12),
                      Expanded(
                        child: Container(
                          height: 44,
                          padding: const EdgeInsets.symmetric(horizontal: 14),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(16),
                            boxShadow: const [
                              BoxShadow(
                                color: Colors.black12,
                                blurRadius: 8,
                                offset: Offset(0,2),
                              )
                            ]
                          ),
                          child:const Row(
                            children: [
                              Icon(
                                Icons.location_on_outlined,
                                color: Colors.grey,
                                size:18,
                              ),
                              SizedBox(width:8),
                              Text(
                                'Ziel eingeben...',
                                style: TextStyle(
                                  color: Colors.grey,
                                  fontSize: 15,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const Spacer(),
                RideBottomSheet(
                  isPassenger: isPassengerRide,
                  onPassengerSelected: (){
                    setState(() {
                      isPassengerRide = true;
                    });
                  },
                  onCourierSelected: (){
                    setState(() {
                      isPassengerRide = false;
                    });
                  },
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  widget _topCircleButton(IconData icon){
    return Container(
      width: 38,
      height: 38,
      decoration: BoxDecoration(
        color: Colors.white,
        shape: BoxShape.circle,
        boxShadow: [
          BoxShadow(
            color: Colors.black12,
            blurRadius: 8,
            offset: Offset(0,2),
          )
        ]
      ),
      child: Icon(icon, size: 18, color: Colors.Black87),
    );
  }
}


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
    final backgroundPaint = Paint()..color = const Color(0xFFD7D2CB);
    canvas.drawRect(Rect.fromLTWH(0, 0, size.width, size.height), backgroundPaint);

    final roadPaint = Paint()
      ..color = Colors.white.withOpacity(0.85)
      ..strokeWidth = 7;

    final buildingPaint = Paint()..color = const Color(0xFFCDC7C0);
    final parkPaint = Paint()..color = const Color(0xFFBFE3A8);
    final waterPaint = Paint()..color = const Color(0xFFB6DCE8);

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
      ..color = const Color(0xFFF4E78B)
      ..strokeWidth = 4;

    const riderPoint = Offset(165, 530);
    canvas.drawLine(riderPoint, Offset(250, 585), routePaint);

    final blueDot = Paint()..color = const Color(0xFF5B9DFF);
    final whiteDot = Paint()..color = Colors.white;

    canvas.drawCircle(riderPoint, 8, blueDot);
    canvas.drawCircle(riderPoint, 4, whiteDot);

    canvas.drawCircle(const Offset(300, 355), 5, blueDot);
    canvas.drawCircle(const Offset(520, 575), 5, blueDot);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}