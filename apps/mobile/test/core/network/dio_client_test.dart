import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:zynqly_mobile/core/network/api_config.dart';
import 'package:zynqly_mobile/core/network/auth_token_provider.dart';
import 'package:zynqly_mobile/core/network/dio_client.dart';

import '../../utils/fake_http_adapter.dart';

void main() {
  test('dioProvider uses the configured base URL', () {
    final container = ProviderContainer();
    addTearDown(container.dispose);

    final dio = container.read(dioProvider);

    expect(dio.options.baseUrl, ApiConfig.baseUrl);
    expect(dio.options.baseUrl, endsWith('/api/v1'));
  });

  group('auth interceptor', () {
    late ProviderContainer container;
    late FakeHttpAdapter adapter;

    setUp(() {
      container = ProviderContainer();
      addTearDown(container.dispose);
      adapter = FakeHttpAdapter('{}');
      container.read(dioProvider).httpClientAdapter = adapter;
    });

    test('sends no Authorization header without a token', () async {
      await container.read(dioProvider).get('/ride-history');

      expect(adapter.lastRequest.headers['Authorization'], isNull);
    });

    test('adds the bearer token once a token is set', () async {
      container.read(authTokenProvider.notifier).setToken('abc');

      await container.read(dioProvider).get('/ride-history');

      expect(adapter.lastRequest.headers['Authorization'], 'Bearer abc');
    });

    test('never sends the token to /auth endpoints', () async {
      container.read(authTokenProvider.notifier).setToken('abc');

      await container.read(dioProvider).post('/auth/sign-in');

      expect(adapter.lastRequest.headers['Authorization'], isNull);
    });
  });
}
