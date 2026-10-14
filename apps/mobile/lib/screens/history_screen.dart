import 'package:flutter/material.dart';

class HistoryScreen extends StatefulWidget {
  const HistoryScreen({super.key});

  @override
  State<HistoryScreen> createState() => _HistoryScreenState();
}

class _HistoryScreenState extends State<HistoryScreen> {
  // Placeholder data for rides
  final List<Map<String, dynamic>> rides = [
    {
      'route': 'Hauptbahnhof nach Flugh...',
      'price': '42.50 €',
      'date': '2026-04-11',
      'time': '08:15',
      'status': 'completed',
      'type': 'taxi',
    },
    {
      'route': 'Friedrichstr. 12 nach Alex...',
      'price': '18.90 €',
      'date': '2026-04-11',
      'time': '08:15',
      'status': 'completed',
      'type': 'delivery',
    },
    {
      'route': 'Potsdamer Platz nach Char...',
      'price': '28.60 €',
      'date': '2026-04-10',
      'time': '19:45',
      'status': 'completed',
      'type': 'taxi',
    },
    {
      'route': 'Neukölln nach Prenzlauer ...',
      'price': '22.80 €',
      'date': '2026-04-09',
      'time': '22:10',
      'status': 'cancelled',
      'type': 'taxi',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Fahrtenbuch'),
        actions: [
          // Simulates the "This Week" dropdown button
          TextButton.icon(
            onPressed: () {},
            icon: const Icon(Icons.expand_more, color: Colors.black),
            label: const Text(
              'This Week',
              style: TextStyle(color: Colors.black),
            ),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(12.0),
        child: ListView.builder(
          itemCount: rides.length,
          itemBuilder: (context, index) {
            final ride = rides[index];
            return _buildRideCard(ride);
          },
        ),
      ),
    );
  }

  // Helper function to build a single ride item
  Widget _buildRideCard(Map<String, dynamic> ride) {
    bool isCancelled = ride['status'] == 'cancelled';
    bool isDelivery = ride['type'] == 'delivery';

    return Card(
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15),
        side: BorderSide(color: Colors.grey.shade500), // Light border
      ),
      margin: const EdgeInsets.symmetric(vertical: 8),
      child: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Row(
          children: [
            // Icon Circle
            CircleAvatar(
              backgroundColor: isDelivery
                  ? Colors.teal.shade50
                  : Colors.orange.shade50,
              child: Icon(
                isDelivery
                    ? Icons.inventory_2_outlined
                    : Icons.local_taxi_outlined,
                color: isDelivery ? Colors.teal : Colors.orange,
              ),
            ),
            const SizedBox(width: 16),

            // Text Column (Route, Date, Status)
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    ride['route'],
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 20,
                      overflow: TextOverflow.ellipsis,
                      color: Colors.black
                    ),
                  ),
                  Text(
                    ride['price'],
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      Text(
                        '${ride['date']}  ${ride['time']}',
                        style: TextStyle(
                          color: Colors.grey.shade600,
                          fontSize: 13,
                        ),
                      ),
                      const SizedBox(width: 12),
                      // Status Badge
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 8,
                          vertical: 2,
                        ),
                        decoration: BoxDecoration(
                          color: isCancelled
                              ? Colors.red.shade50
                              : Colors.orange.shade100,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Text(
                          ride['status'],
                          style: TextStyle(
                            fontSize: 11,
                            color: isCancelled
                                ? Colors.red
                                : Colors.orange.shade800,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            // Detail View Icon
            const Icon(Icons.chevron_right, color: Colors.grey),
          ],
        ),
      ),
    );
  }
}
