import 'dart:typed_data';

import 'package:dio/dio.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:zynqly_mobile/features/rides/data/ride_repository.dart';

/// Answers every request with a fixed JSON body and records the request.
class _FakeAdapter implements HttpClientAdapter {
  _FakeAdapter(this.body);

  final String body;
  RequestOptions? lastRequest;

  @override
  Future<ResponseBody> fetch(
    RequestOptions options,
    Stream<Uint8List>? requestStream,
    Future<void>? cancelFuture,
  ) async {
    lastRequest = options;
    return ResponseBody.fromString(
      body,
      200,
      headers: {
        Headers.contentTypeHeader: [Headers.jsonContentType],
      },
    );
  }

  @override
  void close({bool force = false}) {}
}

const _responseBody = '''
{
  "content": [
    {
      "id": "R-1042",
      "dateTime": "2026-04-11T08:15:00",
      "type": "Passagier",
      "from": "Hauptbahnhof",
      "to": "Flughafen",
      "amount": 42.50,
      "settlement": "card",
      "status": "completed"
    }
  ],
  "page": { "size": 6, "number": 1, "totalElements": 13, "totalPages": 3 }
}
''';

void main() {
  test(
    'getRides requests /ride-history with paging and parses the page',
    () async {
      final adapter = _FakeAdapter(_responseBody);
      final dio = Dio(BaseOptions(baseUrl: 'http://localhost:8080/api/v1'))
        ..httpClientAdapter = adapter;
      final repository = ApiRideRepository(dio);

      final page = await repository.getRides(page: 1, size: 6);

      expect(
        adapter.lastRequest!.uri.toString(),
        'http://localhost:8080/api/v1/ride-history?page=1&size=6',
      );
      expect(page.rides.single.id, 'R-1042');
      expect(page.number, 1);
      expect(page.hasNext, isTrue);
    },
  );
}
