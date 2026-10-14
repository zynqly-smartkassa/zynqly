enum RideType {
  passenger('Passagier'),
  errand('Boten');

  const RideType(this.apiValue);

  final String apiValue;

  static RideType fromApi(String value) => values.firstWhere(
    (type) => type.apiValue == value,
    orElse: () => throw FormatException('Unknown ride type: $value'),
  );
}

enum RideStatus {
  completed,
  cancelled,
  pending;

  static RideStatus fromApi(String value) => values.firstWhere(
    (status) => status.name == value,
    orElse: () => throw FormatException('Unknown ride status: $value'),
  );
}

enum Settlement {
  card,
  cash;

  static Settlement fromApi(String value) => values.firstWhere(
    (settlement) => settlement.name == value,
    orElse: () => throw FormatException('Unknown settlement: $value'),
  );
}

/// A single entry of the ride history as returned by `GET /ride-history`.
class Ride {
  const Ride({
    required this.id,
    required this.dateTime,
    required this.type,
    required this.from,
    required this.to,
    required this.amount,
    required this.settlement,
    required this.status,
  });

  final String id;
  final DateTime dateTime;
  final RideType type;
  final String from;
  final String to;

  /// Fare in euro. Only used for display, so `double` is sufficient.
  final double amount;
  final Settlement settlement;
  final RideStatus status;

  factory Ride.fromJson(Map<String, dynamic> json) {
    return Ride(
      id: json['id'] as String,
      dateTime: DateTime.parse(json['dateTime'] as String),
      type: RideType.fromApi(json['type'] as String),
      from: json['from'] as String,
      to: json['to'] as String,
      amount: (json['amount'] as num).toDouble(),
      settlement: Settlement.fromApi(json['settlement'] as String),
      status: RideStatus.fromApi(json['status'] as String),
    );
  }
}
