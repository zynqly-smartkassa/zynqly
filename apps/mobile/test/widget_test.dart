import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:zynqly_mobile/app/app.dart';

void main() {
  testWidgets('App starts and shows the bottom navigation', (tester) async {
    await tester.pumpWidget(const ProviderScope(child: ZynqlyApp()));

    expect(find.text('Home'), findsWidgets);
    expect(find.text('History'), findsOneWidget);
  });
}
