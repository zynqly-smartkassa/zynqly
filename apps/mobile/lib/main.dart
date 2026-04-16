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

class RideBottomSheet extends StatelessWidget {
  final bool isPassenger;
  final VoidCallback onPassengerSelected;
  final VoidCallback onCourierSelected;

  const RideBottomSheet({
    super.key,
    required this.isPassenger,
    required this.onPassengerSelected,
    required this.onCourierSelected,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16, 12, 16,18),
      decoration: BoxDecoration(
        color: Color(0xFFF5F1EA),
        borderRadius: const BorderRadius.vertical(top: Radius.circular(22)),
        boxShadow: [
          BoxShadow(
            color: Colors.black12,
            blurRadius: 12,
            offset: Offset(0, -3),
          )
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children:[
          Container(
            width: 34,
            height: 4,
            margin: const EdgeInsets.only(bottom: 12),
            decoration: BoxDecoration(
              color: Colors.grey,
              borderRadius: BorderRadius.circular(8),
            ),
          ),
          Row(
            children:[
              Expanded(
                child: RideTypeButton(
                  title: 'passagierfahrt',
                  icon: Icons.person_outline,
                  isSelected: isPassenger,
                  onTap: onPassengerSelected,
                ),
              ),
              const SizedBox(width:10),
              Expanded(
                child: RideTypeButton(
                  title: 'Botenfahrt',
                  icon: Icons.inventory_2_outlined,
                  isSelected: !isPassengerRide,
                  onTap: onCourierSelected,
                ),
              ),
            ],
          ),
          const SizedBox(height:14),
          const LocationField(
            dotColor: colors.green,
            label: 'Abholort',
            value: 'Hauptbahnhof, Graz',
          ),
          const SizedBox(height:10),
          const LocationField(
            dotColor: colors.red,
            label: 'Zielort',
            value: 'Ziel eingeben oder auf Karte tippen',
            isPlaceholder: true,
          ),
          const SizedBox(height:14),
          const Row(
            children:[
              Expanded(
                child: PriceBox(
                  label: 'Fahrtkosten',
                  value: '30,00 €',
                ),
              ),
              sizedBox(width:10),
              Expanded(
                child: PriceBox(
                  title: 'pro km',
                  value: '2,50 €',
                ),
              ),
              sizedBox(width:10),
              Expanded(
                child: PriceBox(
                  title: 'pro min',
                  value: '0,50 €',
                ),
              ),
            ],
          ),
          const SizedBox(height:14),
          sizedbox(
            width: double.infinity,
            height: 48,
            child: ElevatedButton.icon(
              onPressed: (){},
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFFDD7A00),
                foregroundColor: Colors.white,
                elevation: 0,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(14),
                ),
              ),
              icon: const Icon(Icons.play_arrow_rounded),
              label: const Text(
                'Fahrt starten',
                 style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}


class RideTypeButton extends StatelessWidget {
  final String title;
  final IconData icon;
  final bool isSelected;
  final VoidCallback onTap;

  const RideTypeButton({
    super.key,
    required this.title,
    required this.icon,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      borderRadius: BorderRadius.circular(14),
      onTap: onTap,
      child: Container(
        height: 44,
        decoration: BoxDecoration(
          color: isSelected ? const Color(0xFFDD7A00) : const Color(0xffE4DeD6),
          borderRadius: BorderRadius.circular(14),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children:[
            Icon(icon, size: 18, color: isSelected ? Colors.white : Colors.black87),
            const SizedBox(width:8),
            Text(
              title,
              style: TextStyle(
                color: isSelected ? Colors.white : Colors.black87,
                fontSize: 15,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class LocationField extends StatelessWidget {
  final Color dotColor;
  final String label;
  final String value;
  final bool isPlaceholder;

  const LocationField({
    super.key,
    required this.dotColor,
    required this.label,
    required this.value,
    this.isPlaceholder = false,
  });

  @override
  Widget build(BuildContext context){
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children:[
        container(
          width: 10,
          height: 10,
          decoration: BoxDecoration(
            color: dotColor,
            shape: BoxShape.circle,
          ),
        ),
        const SizedBox(width:10),
        Expanded(
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal:14, vertical: 12),
            decoration: BoxDecoration(
              color: const Color(0xFFE3DED6),
              borderRadius: BorderRadius.circular(14),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children:[
                Text(
                  label,
                  style: TextStyle(
                    color: Colors.grey,
                    fontSize: 11,
                    letterSpacing: 0.6,
                  ),
                ),
                const SizedBox(height:4),
                Text(
                  value,
                  style: TextStyle(
                    color: isPlaceholder ? Colors.grey : Colors.black87,
                    fontSize: 16,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}  

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
      height: 66,
      decoration: BoxDecoration(
        color: const Color(0xFFEAE5DE),
        borderRadius: BorderRadius.circular(14),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            title,
            style: TextStyle(
              color: Colors.grey.shade700,
              fontSize: 12,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            value,
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }
}