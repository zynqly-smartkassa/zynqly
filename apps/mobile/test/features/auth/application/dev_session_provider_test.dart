import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:zynqly_mobile/core/network/auth_token_provider.dart';
import 'package:zynqly_mobile/features/auth/application/dev_session_provider.dart';
import 'package:zynqly_mobile/features/auth/data/auth_repository.dart';

class _FakeAuthRepository implements AuthRepository {
  @override
  Future<AuthTokens> signIn({
    required String email,
    required String password,
  }) async {
    return const AuthTokens(accessToken: 'dev-token', expiresIn: 900);
  }
}

ProviderContainer _container(DevCredentials credentials) {
  final container = ProviderContainer(
    overrides: [
      devCredentialsProvider.overrideWithValue(credentials),
      authRepositoryProvider.overrideWithValue(_FakeAuthRepository()),
    ],
  );
  addTearDown(container.dispose);
  return container;
}

void main() {
  test('signs in with the dev user and stores the access token', () async {
    final container = _container(
      const DevCredentials(email: 'dev@zynqly.test', password: 'secret1'),
    );

    await container.read(devSessionProvider.future);

    expect(container.read(authTokenProvider), 'dev-token');
  });

  test('fails with a helpful error when no dev user is configured', () async {
    final container = _container(const DevCredentials(email: '', password: ''));

    await expectLater(
      container.read(devSessionProvider.future),
      throwsA(isA<StateError>()),
    );
    expect(container.read(authTokenProvider), isNull);
  });
}
