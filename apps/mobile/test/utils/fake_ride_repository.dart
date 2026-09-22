import 'package:zynqly_mobile/features/rides/data/models/ride.dart';
import 'package:zynqly_mobile/features/rides/data/models/ride_page.dart';
import 'package:zynqly_mobile/features/rides/data/ride_repository.dart';

Ride buildRide(
  String id, {
  RideType type = RideType.passenger,
  RideStatus status = RideStatus.completed,
}) {
  return Ride(
    id: id,
    dateTime: DateTime(2026, 4, 11, 8, 15),
    type: type,
    from: 'Hauptbahnhof',
    to: 'Flughafen',
    amount: 42.5,
    settlement: Settlement.card,
    status: status,
  );
}

/// Serves the given pages in order and can be told to fail instead.
class FakeRideRepository implements RideRepository {
  FakeRideRepository(this.pages);

  final List<List<Ride>> pages;
  Object? error;
  final List<int> requestedPages = [];

  @override
  Future<RidePage> getRides({int page = 0, int size = 20}) async {
    requestedPages.add(page);
    if (error != null) throw error!;
    return RidePage(
      rides: pages[page],
      number: page,
      size: size,
      totalElements: pages.fold(0, (sum, p) => sum + p.length),
      totalPages: pages.length,
    );
  }
}
