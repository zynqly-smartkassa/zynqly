import 'package:zynqly_mobile/features/rides/data/models/ride.dart';

/// One page of the ride history (Spring `Page` serialized as DTO).
class RidePage {
  const RidePage({
    required this.rides,
    required this.number,
    required this.size,
    required this.totalElements,
    required this.totalPages,
  });

  final List<Ride> rides;

  /// Zero-based index of this page.
  final int number;
  final int size;
  final int totalElements;
  final int totalPages;

  bool get hasNext => number + 1 < totalPages;

  factory RidePage.fromJson(Map<String, dynamic> json) {
    final page = json['page'] as Map<String, dynamic>;
    return RidePage(
      rides: (json['content'] as List)
          .map((entry) => Ride.fromJson(entry as Map<String, dynamic>))
          .toList(),
      number: page['number'] as int,
      size: page['size'] as int,
      totalElements: page['totalElements'] as int,
      totalPages: page['totalPages'] as int,
    );
  }
}
