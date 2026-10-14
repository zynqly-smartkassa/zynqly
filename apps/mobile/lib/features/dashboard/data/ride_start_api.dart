import 'dart:convert';
import 'dart:io';

/// Mobile-only client for the temporary ride-start prototype.
class RideStartApi {
  final String baseUrl;

  RideStartApi({String? baseUrl}) : baseUrl = baseUrl ?? _defaultUrl();

  static String _defaultUrl() {
    const configured = String.fromEnvironment('RIDE_API_URL');
    if (configured.isNotEmpty) return configured;
    return Platform.isAndroid
        ? 'http://10.0.2.2:8080/api/v1'
        : 'http://localhost:8080/api/v1';
  }

  Future<String> start({
    required bool passenger,
    required String pickup,
    required String destination,
  }) async {
    final client = HttpClient()
      ..connectionTimeout = const Duration(seconds: 10);
    try {
      return await (() async {
        final request = await client.postUrl(Uri.parse('$baseUrl/ride-starts'));
        request.headers.contentType = ContentType.json;
        const token = String.fromEnvironment('RIDE_API_TOKEN');
        if (token.isNotEmpty) {
          request.headers.set(HttpHeaders.authorizationHeader, 'Bearer $token');
        }
        request.write(
          jsonEncode({
            'rideType': passenger ? 'PASSENGER' : 'COURIER',
            'pickupAddress': pickup.trim(),
            'destinationAddress': destination.trim(),
          }),
        );
        final response = await request.close();
        final body = await utf8.decoder.bind(response).join();
        if (response.statusCode != 201) {
          throw const HttpException('Fahrt konnte nicht gestartet werden.');
        }
        final data = jsonDecode(body) as Map<String, dynamic>;
        final id = data['id'];
        if (id is! String || id.isEmpty || data['status'] != 'STARTED') {
          throw const FormatException('Ungültige Serverantwort');
        }
        return id;
      })().timeout(const Duration(seconds: 15));
    } finally {
      client.close(force: true);
    }
  }
}
