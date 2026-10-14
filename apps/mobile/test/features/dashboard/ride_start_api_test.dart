import 'dart:convert';
import 'dart:io';
import 'package:flutter_test/flutter_test.dart';
import 'package:zynqly_mobile/features/dashboard/data/ride_start_api.dart';

void main() {
  test('sends selected ride and addresses and reads confirmation', () async {
    final server = await HttpServer.bind(InternetAddress.loopbackIPv4, 0);
    addTearDown(() => server.close(force: true));
    final handled = server.first.then((request) async {
      expect(request.method, 'POST');
      expect(request.uri.path, '/ride-starts');
      final data = jsonDecode(await utf8.decoder.bind(request).join());
      expect(data['rideType'], 'COURIER');
      expect(data['pickupAddress'], 'Graz Hbf');
      expect(data['destinationAddress'], 'Graz Flughafen');
      request.response.statusCode = 201;
      request.response.write(
        jsonEncode({'id': 'ride-123', 'status': 'STARTED'}),
      );
      await request.response.close();
    });
    final api = RideStartApi(baseUrl: 'http://127.0.0.1:${server.port}');
    expect(
      await api.start(
        passenger: false,
        pickup: ' Graz Hbf ',
        destination: 'Graz Flughafen',
      ),
      'ride-123',
    );
    await handled;
  });

  test('does not treat a rejected request as a started ride', () async {
    final server = await HttpServer.bind(InternetAddress.loopbackIPv4, 0);
    addTearDown(() => server.close(force: true));
    final handled = server.first.then((request) async {
      await request.drain<void>();
      request.response.statusCode = 400;
      await request.response.close();
    });
    final api = RideStartApi(baseUrl: 'http://127.0.0.1:${server.port}');
    await expectLater(
      api.start(passenger: true, pickup: 'Graz', destination: ''),
      throwsA(isA<HttpException>()),
    );
    await handled;
  });
}
