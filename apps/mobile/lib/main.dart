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
