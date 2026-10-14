import 'package:flutter_riverpod/flutter_riverpod.dart';

/// Holds the current JWT access token in memory (`null` = not signed in).
///
/// The token is lost when the app restarts; secure persistence is part of the
/// real auth feature.
class AuthTokenNotifier extends Notifier<String?> {
  @override
  String? build() => null;

  void setToken(String? token) => state = token;
}

final authTokenProvider = NotifierProvider<AuthTokenNotifier, String?>(
  AuthTokenNotifier.new,
);
