import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:zynqly_mobile/screens/root_screen.dart';

void main() {
  testWidgets('New Ride opens preparation and both addresses are editable', (
    tester,
  ) async {
    tester.view.physicalSize = const Size(1206, 2622);
    tester.view.devicePixelRatio = 3;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    await tester.pumpWidget(const MaterialApp(home: RootScreen()));
    await tester.tap(find.text('New Ride').last);
    await tester.pumpAndSettle();
    expect(find.text('Fahrt starten'), findsOneWidget);
    await tester.tap(find.text('ABHOLUNG'));
    await tester.pumpAndSettle();
    await tester.enterText(find.byType(TextFormField), 'Wien Hauptbahnhof');
    await tester.tap(find.text('Übernehmen'));
    await tester.pumpAndSettle();
    expect(find.text('Wien Hauptbahnhof'), findsOneWidget);
    await tester.tap(find.text('ZIEL'));
    await tester.pumpAndSettle();
    await tester.enterText(find.byType(TextFormField), 'Wien Flughafen');
    await tester.tap(find.text('Übernehmen'));
    await tester.pumpAndSettle();
    expect(find.text('Wien Flughafen'), findsWidgets);
    expect(tester.takeException(), isNull);
  });
}
