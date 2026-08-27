import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:zynqly_mobile/core/network/dio_client.dart';
import 'package:zynqly_mobile/features/rides/data/models/ride_page.dart';

/// Source of ride data. Screens depend on this interface only.
abstract class RideRepository {
  Future<RidePage> getRides({int page = 0, int size = 20});
}

/// Loads rides from the backend (`GET /ride-history`).
class ApiRideRepository implements RideRepository {
  ApiRideRepository(this._dio);

  final Dio _dio;

  @override
  Future<RidePage> getRides({int page = 0, int size = 20}) async {
    final response = await _dio.get<Map<String, dynamic>>(
      '/ride-history',
      queryParameters: {'page': page, 'size': size},
    );
    return RidePage.fromJson(response.data!);
  }
}

final rideRepositoryProvider = Provider<RideRepository>((ref) {
  return ApiRideRepository(ref.watch(dioProvider));
});
