import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:zynqly_mobile/core/network/api_config.dart';

/// Shared HTTP client for all features.
///
/// Features read this provider to build their repositories, so tests can
/// replace it with a fake via `ProviderScope.overrides`.
final dioProvider = Provider<Dio>((ref) {
  return Dio(
    BaseOptions(
      baseUrl: ApiConfig.baseUrl,
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 10),
      headers: {'Accept': 'application/json'},
    ),
  );
});
