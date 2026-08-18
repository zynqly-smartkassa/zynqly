/// Central place for values that depend on the environment the app talks to.
class ApiConfig {
  /// Base URL of the backend including the context path.
  ///
  /// Override with `--dart-define=API_BASE_URL=...`. The default targets the
  /// host machine from the Android emulator (`10.0.2.2` is the emulator's
  /// alias for the host's `localhost`).
  static const String baseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'http://10.0.2.2:8080/api/v1',
  );
}
