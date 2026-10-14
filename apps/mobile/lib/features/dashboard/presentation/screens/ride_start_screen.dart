// @Mario Shenouda
// die gleich wie die ride_start_screen, aber hier wird dann die map gezeichnet,
// damit man die map nicht in jedem screen neu zeichnen muss,
// sondern nur hier und dann in den anderen screens einfach die map als hintergrund nutzen kann

import 'package:flutter/material.dart';
import '../../data/ride_start_api.dart';
import '../../../../core/theme/app_colors.dart';
import '../painters/map_painter.dart';
import '../widgets/ride_bottom_sheet.dart';

class RideStartScreen extends StatefulWidget {
  const RideStartScreen({super.key});

  @override
  State<RideStartScreen> createState() => _RideStartScreenState();
}

class _RideStartScreenState extends State<RideStartScreen> {
  bool isPassengerRide = true;

  String pickupAddress = 'Graz Hauptbahnhof, Graz';
  String destinationAddress = '';
  bool isStarting = false;
  String? startedRideId;
  final RideStartApi api = RideStartApi();
  final String basePrice = '3,90 €';
  final String pricePerKm = '2,30 €';
  final String pricePerMinute = '0,50 €';

  void _selectPassengerRide() {
    if (isStarting || startedRideId != null) return;
    setState(() {
      isPassengerRide = true;
    });
  }

  void _selectCourierRide() {
    if (isStarting || startedRideId != null) return;
    setState(() {
      isPassengerRide = false;
    });
  }

  Future<void> _editDestination() => _editAddress(pickup: false);

  Future<void> _editAddress({required bool pickup}) async {
    if (isStarting || startedRideId != null) return;
    var edited = pickup ? pickupAddress : destinationAddress;
    final formKey = GlobalKey<FormState>();
    final value = await showDialog<String>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(pickup ? 'Abholung eingeben' : 'Ziel eingeben'),
        content: Form(
          key: formKey,
          child: TextFormField(
            initialValue: edited,
            autofocus: true,
            maxLength: 300,
            onChanged: (value) => edited = value,
            validator: (value) => value == null || value.trim().isEmpty
                ? 'Bitte eine Adresse eingeben.'
                : null,
            decoration: const InputDecoration(hintText: 'Adresse eingeben'),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Abbrechen'),
          ),
          TextButton(
            onPressed: () {
              if (formKey.currentState!.validate()) {
                Navigator.pop(context, edited.trim());
              }
            },
            child: const Text('Übernehmen'),
          ),
        ],
      ),
    );
    if (!mounted || value == null) return;
    setState(() {
      if (pickup) {
        pickupAddress = value;
      } else {
        destinationAddress = value;
      }
    });
  }

  Future<void> _startRide() async {
    if (isStarting || startedRideId != null) return;
    if (pickupAddress.trim().isEmpty || destinationAddress.trim().isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Bitte Abholung und Ziel eingeben.')),
      );
      return;
    }
    setState(() => isStarting = true);
    try {
      final id = await api.start(
        passenger: isPassengerRide,
        pickup: pickupAddress,
        destination: destinationAddress,
      );
      if (!mounted) return;
      setState(() => startedRideId = id);
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Fahrt gestartet. ID: $id')));
    } catch (_) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text(
            'Keine Bestätigung erhalten. Verbindung und Server prüfen, bevor du erneut startest.',
          ),
        ),
      );
    } finally {
      if (mounted) setState(() => isStarting = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          const Positioned.fill(child: MapBackground()),
          SafeArea(
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.fromLTRB(18, 18, 18, 0),
                  child: Row(
                    children: [
                      _topCircleButton(Icons.arrow_back_ios_new_rounded),
                      const SizedBox(width: 12),
                      Expanded(
                        child: GestureDetector(
                          onTap: isStarting || startedRideId != null
                              ? null
                              : _editDestination,
                          child: Container(
                            height: 66,
                            padding: const EdgeInsets.symmetric(horizontal: 20),
                            decoration: BoxDecoration(
                              color: Colors.white.withValues(alpha: 0.96),
                              borderRadius: BorderRadius.circular(24),
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black.withValues(alpha: 0.08),
                                  blurRadius: 16,
                                  offset: const Offset(0, 4),
                                ),
                              ],
                            ),
                            child: Row(
                              children: [
                                Icon(
                                  Icons.location_on_outlined,
                                  color: AppColors.textSecondary,
                                  size: 28,
                                ),
                                SizedBox(width: 12),
                                Expanded(
                                  child: Text(
                                    destinationAddress.isEmpty
                                        ? 'Ziel eingeben...'
                                        : destinationAddress,
                                    overflow: TextOverflow.ellipsis,
                                    style: TextStyle(
                                      color: AppColors.textSecondary,
                                      fontSize: 18,
                                      fontWeight: FontWeight.w400,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const Spacer(),
                RideBottomSheet(
                  onEditPickup: isStarting || startedRideId != null
                      ? null
                      : () => _editAddress(pickup: true),
                  onEditDestination: isStarting || startedRideId != null
                      ? null
                      : _editDestination,
                  isPassengerRide: isPassengerRide,
                  onPassengerSelected: _selectPassengerRide,
                  onCourierSelected: _selectCourierRide,
                  pickupAddress: pickupAddress,
                  destinationAddress: destinationAddress.isEmpty
                      ? 'Ziel eingeben – antippen'
                      : destinationAddress,
                  basePrice: basePrice,
                  pricePerKm: pricePerKm,
                  pricePerMinute: pricePerMinute,
                  onStartRide: isStarting || startedRideId != null
                      ? null
                      : _startRide,
                  isStarting: isStarting,
                  hasStarted: startedRideId != null,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _topCircleButton(IconData icon) {
    return Container(
      width: 62,
      height: 62,
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.96),
        shape: BoxShape.circle,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.08),
            blurRadius: 16,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Icon(icon, size: 28, color: AppColors.textPrimary),
    );
  }
}
