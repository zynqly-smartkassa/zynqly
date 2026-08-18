import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:zynqly_mobile/core/network/api_config.dart';
import 'package:zynqly_mobile/core/network/dio_client.dart';

void main() {
  test('dioProvider uses the configured base URL', () {
    final container = ProviderContainer();
    addTearDown(container.dispose);

    final dio = container.read(dioProvider);

    expect(dio.options.baseUrl, ApiConfig.baseUrl);
    expect(dio.options.baseUrl, endsWith('/api/v1'));
  });
}
