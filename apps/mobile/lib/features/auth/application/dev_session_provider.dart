import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:zynqly_mobile/core/network/auth_token_provider.dart';
import 'package:zynqly_mobile/features/auth/data/auth_repository.dart';

/// Credentials of the development user, passed in at build time:
/// `--dart-define=DEV_EMAIL=... --dart-define=DEV_PASSWORD=...`.
/// They are intentionally not stored in the repository.
class DevCredentials {
  const DevCredentials({required this.email, required this.password});

  final String email;
  final String password;

  bool get isConfigured => email.isNotEmpty && password.isNotEmpty;
}

final devCredentialsProvider = Provider<DevCredentials>((ref) {
  return const DevCredentials(
    email: String.fromEnvironment('DEV_EMAIL'),
    password: String.fromEnvironment('DEV_PASSWORD'),
  );
});

/// Provisional sign-in for development: signs in once with the dev user and
/// stores the access token, so protected endpoints can be called.
///
/// Features that need the backend `await ref.watch(devSessionProvider.future)`
/// first. This is replaced by the real login flow later.
final devSessionProvider = FutureProvider<void>(retry: (_, _) => null, (
  ref,
) async {
  final credentials = ref.read(devCredentialsProvider);
  if (!credentials.isConfigured) {
    throw StateError(
      'Dev login is not configured. Start the app with '
      '--dart-define=DEV_EMAIL=... --dart-define=DEV_PASSWORD=...',
    );
  }

  final tokens = await ref
      .read(authRepositoryProvider)
      .signIn(email: credentials.email, password: credentials.password);
  ref.read(authTokenProvider.notifier).setToken(tokens.accessToken);
});
