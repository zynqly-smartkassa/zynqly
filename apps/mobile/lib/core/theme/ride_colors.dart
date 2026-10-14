import 'package:flutter/material.dart';

/// A foreground color with a matching soft background, e.g. for badges and
/// icon circles.
@immutable
class Tint {
  const Tint({required this.foreground, required this.background});

  final Color foreground;
  final Color background;

  static Tint lerp(Tint a, Tint b, double t) => Tint(
    foreground: Color.lerp(a.foreground, b.foreground, t)!,
    background: Color.lerp(a.background, b.background, t)!,
  );
}

/// Colors for ride types and ride statuses.
///
/// Read with `Theme.of(context).extension<RideColors>()!`.
@immutable
class RideColors extends ThemeExtension<RideColors> {
  const RideColors({
    required this.passenger,
    required this.errand,
    required this.completed,
    required this.pending,
    required this.cancelled,
  });

  final Tint passenger;
  final Tint errand;
  final Tint completed;
  final Tint pending;
  final Tint cancelled;

  static const light = RideColors(
    passenger: Tint(
      foreground: Color(0xFFD97706),
      background: Color(0xFFFFF3E0),
    ),
    errand: Tint(foreground: Color(0xFF009688), background: Color(0xFFE0F2F1)),
    completed: Tint(
      foreground: Color(0xFF2E7D32),
      background: Color(0xFFE8F5E9),
    ),
    pending: Tint(foreground: Color(0xFFEF6C00), background: Color(0xFFFFE0B2)),
    cancelled: Tint(
      foreground: Color(0xFFD32F2F),
      background: Color(0xFFFFEBEE),
    ),
  );

  @override
  RideColors copyWith({
    Tint? passenger,
    Tint? errand,
    Tint? completed,
    Tint? pending,
    Tint? cancelled,
  }) {
    return RideColors(
      passenger: passenger ?? this.passenger,
      errand: errand ?? this.errand,
      completed: completed ?? this.completed,
      pending: pending ?? this.pending,
      cancelled: cancelled ?? this.cancelled,
    );
  }

  @override
  RideColors lerp(RideColors? other, double t) {
    if (other == null) return this;
    return RideColors(
      passenger: Tint.lerp(passenger, other.passenger, t),
      errand: Tint.lerp(errand, other.errand, t),
      completed: Tint.lerp(completed, other.completed, t),
      pending: Tint.lerp(pending, other.pending, t),
      cancelled: Tint.lerp(cancelled, other.cancelled, t),
    );
  }
}
