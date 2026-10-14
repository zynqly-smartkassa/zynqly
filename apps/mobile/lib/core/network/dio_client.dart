import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:zynqly_mobile/core/network/api_config.dart';
import 'package:zynqly_mobile/core/network/auth_token_provider.dart';

/// Shared HTTP client for all features.
///
/// Features read this provider to build their repositories, so tests can
/// replace it with a fake via `ProviderScope.overrides`.
///
/// Requests get an `Authorization: Bearer <token>` header as soon as a token
/// is available. `/auth/**` requests are sent without it, because the backend
/// must not see a stale token while signing in.
final dioProvider = Provider<Dio>((ref) {
  final dio = Dio(
    BaseOptions(
      baseUrl: ApiConfig.baseUrl,
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 10),
      headers: {'Accept': 'application/json'},
    ),
  );

  dio.interceptors.add(
    InterceptorsWrapper(
      onRequest: (options, handler) {
        final token = ref.read(authTokenProvider);
        if (token != null && !options.path.startsWith('/auth')) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        handler.next(options);
      },
    ),
  );

  return dio;
});
