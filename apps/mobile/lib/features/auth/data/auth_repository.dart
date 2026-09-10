import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:zynqly_mobile/core/network/dio_client.dart';

/// Response of `POST /auth/sign-in`.
class AuthTokens {
  const AuthTokens({required this.accessToken, required this.expiresIn});

  final String accessToken;

  /// Lifetime of the access token in seconds.
  final int expiresIn;

  factory AuthTokens.fromJson(Map<String, dynamic> json) {
    return AuthTokens(
      accessToken: json['accessTk'] as String,
      expiresIn: json['expiresIn'] as int,
    );
  }
}

abstract class AuthRepository {
  Future<AuthTokens> signIn({required String email, required String password});
}

/// Signs in against the backend (`POST /auth/sign-in`).
class ApiAuthRepository implements AuthRepository {
  ApiAuthRepository(this._dio);

  final Dio _dio;

  @override
  Future<AuthTokens> signIn({
    required String email,
    required String password,
  }) async {
    final response = await _dio.post<Map<String, dynamic>>(
      '/auth/sign-in',
      data: {'email': email, 'password': password},
    );
    return AuthTokens.fromJson(response.data!);
  }
}

final authRepositoryProvider = Provider<AuthRepository>((ref) {
  return ApiAuthRepository(ref.watch(dioProvider));
});
