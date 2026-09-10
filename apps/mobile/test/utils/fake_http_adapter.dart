import 'dart:typed_data';

import 'package:dio/dio.dart';

/// Answers every request with a fixed JSON body and records the requests,
/// so repository tests never touch the network.
class FakeHttpAdapter implements HttpClientAdapter {
  FakeHttpAdapter(this.body, {this.statusCode = 200});

  final String body;
  final int statusCode;
  final List<RequestOptions> requests = [];

  RequestOptions get lastRequest => requests.last;

  @override
  Future<ResponseBody> fetch(
    RequestOptions options,
    Stream<Uint8List>? requestStream,
    Future<void>? cancelFuture,
  ) async {
    requests.add(options);
    return ResponseBody.fromString(
      body,
      statusCode,
      headers: {
        Headers.contentTypeHeader: [Headers.jsonContentType],
      },
    );
  }

  @override
  void close({bool force = false}) {}
}
