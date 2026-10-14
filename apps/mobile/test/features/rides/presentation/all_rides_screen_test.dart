import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:zynqly_mobile/core/theme/app_theme.dart';
import 'package:zynqly_mobile/features/auth/application/dev_session_provider.dart';
import 'package:zynqly_mobile/features/rides/data/models/ride.dart';
import 'package:zynqly_mobile/features/rides/data/ride_repository.dart';
import 'package:zynqly_mobile/features/rides/presentation/screens/all_rides_screen.dart';

import '../../../utils/fake_ride_repository.dart';

Future<void> _pumpScreen(
  WidgetTester tester,
  FakeRideRepository repository,
) async {
  await tester.pumpWidget(
    ProviderScope(
      overrides: [
        rideRepositoryProvider.overrideWithValue(repository),
        devSessionProvider.overrideWith((ref) async {}),
      ],
      child: MaterialApp(
        theme: AppTheme.lightTheme,
        home: const AllRidesScreen(),
      ),
    ),
  );
}

void main() {
  testWidgets('shows a spinner while loading, then the rides', (tester) async {
    final repository = FakeRideRepository([
      [
        buildRide('R-1'),
        buildRide('R-2', type: RideType.errand, status: RideStatus.cancelled),
      ],
    ]);

    await _pumpScreen(tester, repository);
    expect(find.byType(CircularProgressIndicator), findsOneWidget);

    await tester.pumpAndSettle();

    expect(find.text('Fahrtenbuch'), findsOneWidget);
    expect(find.text('Hauptbahnhof nach Flughafen'), findsNWidgets(2));
    expect(find.text('42.50 €'), findsNWidgets(2));
    expect(find.text('2026-04-11  08:15'), findsNWidgets(2));
    expect(find.text('completed'), findsOneWidget);
    expect(find.text('cancelled'), findsOneWidget);
  });

  testWidgets('shows an error with retry and recovers', (tester) async {
    final repository = FakeRideRepository([
      [buildRide('R-1')],
    ])..error = Exception('offline');

    await _pumpScreen(tester, repository);
    await tester.pumpAndSettle();

    expect(
      find.text('Die Fahrten konnten nicht geladen werden.'),
      findsOneWidget,
    );

    repository.error = null;
    await tester.tap(find.text('Erneut versuchen'));
    await tester.pumpAndSettle();

    expect(find.text('Hauptbahnhof nach Flughafen'), findsOneWidget);
  });

  testWidgets('shows a hint when there are no rides', (tester) async {
    await _pumpScreen(tester, FakeRideRepository([[]]));
    await tester.pumpAndSettle();

    expect(find.text('Keine Fahrten vorhanden'), findsOneWidget);
  });
}
