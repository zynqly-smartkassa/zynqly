import 'package:dio/dio.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:zynqly_mobile/features/auth/data/auth_repository.dart';

import '../../../utils/fake_http_adapter.dart';

void main() {
  test('signIn posts the credentials and parses the tokens', () async {
    final adapter = FakeHttpAdapter(
      '{"accessTk": "abc.def.ghi", "expiresIn": 900}',
    );
    final dio = Dio(BaseOptions(baseUrl: 'http://localhost:8080/api/v1'))
      ..httpClientAdapter = adapter;
    final repository = ApiAuthRepository(dio);

    final tokens = await repository.signIn(
      email: 'dev@zynqly.test',
      password: 'secret1',
    );

    expect(adapter.lastRequest.method, 'POST');
    expect(
      adapter.lastRequest.uri.toString(),
      'http://localhost:8080/api/v1/auth/sign-in',
    );
    expect(adapter.lastRequest.data, {
      'email': 'dev@zynqly.test',
      'password': 'secret1',
    });
    expect(tokens.accessToken, 'abc.def.ghi');
    expect(tokens.expiresIn, 900);
  });
}
