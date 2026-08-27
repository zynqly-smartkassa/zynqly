import 'package:flutter_test/flutter_test.dart';
import 'package:zynqly_mobile/features/rides/data/models/ride.dart';
import 'package:zynqly_mobile/features/rides/data/models/ride_page.dart';

const _rideJson = {
  'id': 'R-1042',
  'dateTime': '2026-04-11T08:15:00',
  'type': 'Passagier',
  'from': 'Hauptbahnhof',
  'to': 'Flughafen',
  'amount': 42.5,
  'settlement': 'card',
  'status': 'completed',
};

void main() {
  group('Ride.fromJson', () {
    test('maps all fields to typed values', () {
      final ride = Ride.fromJson(_rideJson);

      expect(ride.id, 'R-1042');
      expect(ride.dateTime, DateTime(2026, 4, 11, 8, 15));
      expect(ride.type, RideType.passenger);
      expect(ride.from, 'Hauptbahnhof');
      expect(ride.to, 'Flughafen');
      expect(ride.amount, 42.5);
      expect(ride.settlement, Settlement.card);
      expect(ride.status, RideStatus.completed);
    });

    test('accepts a whole number as amount', () {
      final ride = Ride.fromJson({..._rideJson, 'amount': 25});

      expect(ride.amount, 25.0);
    });

    test('maps the errand type', () {
      final ride = Ride.fromJson({..._rideJson, 'type': 'Boten'});

      expect(ride.type, RideType.errand);
    });

    test('throws on an unknown status', () {
      expect(
        () => Ride.fromJson({..._rideJson, 'status': 'unknown'}),
        throwsFormatException,
      );
    });
  });

  group('RidePage.fromJson', () {
    final json = {
      'content': [_rideJson],
      'page': {'size': 6, 'number': 0, 'totalElements': 13, 'totalPages': 3},
    };

    test('reads content and page metadata', () {
      final page = RidePage.fromJson(json);

      expect(page.rides, hasLength(1));
      expect(page.number, 0);
      expect(page.totalElements, 13);
      expect(page.totalPages, 3);
    });

    test('hasNext is true until the last page', () {
      expect(RidePage.fromJson(json).hasNext, isTrue);

      final lastPage = RidePage.fromJson({
        ...json,
        'page': {'size': 6, 'number': 2, 'totalElements': 13, 'totalPages': 3},
      });
      expect(lastPage.hasNext, isFalse);
    });
  });
}
