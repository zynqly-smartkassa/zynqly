import 'package:flutter_test/flutter_test.dart';

import 'package:zynqly_mobile/app/app.dart';

void main() {
  testWidgets('App starts and shows the bottom navigation', (tester) async {
    await tester.pumpWidget(const ZynqlyApp());

    expect(find.text('Home'), findsWidgets);
    expect(find.text('History'), findsOneWidget);
  });
}
