import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:zynqly_mobile/features/auth/application/dev_session_provider.dart';
import 'package:zynqly_mobile/features/rides/data/models/ride.dart';
import 'package:zynqly_mobile/features/rides/data/ride_repository.dart';

/// Rides loaded so far plus the paging information needed to load more.
class RidesState {
  const RidesState({
    required this.rides,
    required this.nextPage,
    required this.hasNext,
    this.isLoadingMore = false,
    this.loadMoreFailed = false,
  });

  final List<Ride> rides;
  final int nextPage;
  final bool hasNext;
  final bool isLoadingMore;
  final bool loadMoreFailed;

  RidesState copyWith({
    List<Ride>? rides,
    int? nextPage,
    bool? hasNext,
    bool? isLoadingMore,
    bool? loadMoreFailed,
  }) {
    return RidesState(
      rides: rides ?? this.rides,
      nextPage: nextPage ?? this.nextPage,
      hasNext: hasNext ?? this.hasNext,
      isLoadingMore: isLoadingMore ?? this.isLoadingMore,
      loadMoreFailed: loadMoreFailed ?? this.loadMoreFailed,
    );
  }
}

/// Loads the ride history page by page.
///
/// The first page is loaded in [build]; [loadMore] appends the next one.
/// Invalidating `devSessionProvider` (pull to refresh, retry) signs in again
/// and reloads everything, because this controller watches it.
class RidesController extends AsyncNotifier<RidesState> {
  static const pageSize = 20;

  @override
  Future<RidesState> build() async {
    await ref.watch(devSessionProvider.future);

    final page = await ref
        .read(rideRepositoryProvider)
        .getRides(page: 0, size: pageSize);
    return RidesState(rides: page.rides, nextPage: 1, hasNext: page.hasNext);
  }

  Future<void> loadMore() async {
    final current = state.value;
    if (current == null || !current.hasNext || current.isLoadingMore) return;

    state = AsyncData(
      current.copyWith(isLoadingMore: true, loadMoreFailed: false),
    );
    try {
      final page = await ref
          .read(rideRepositoryProvider)
          .getRides(page: current.nextPage, size: pageSize);
      state = AsyncData(
        current.copyWith(
          rides: [...current.rides, ...page.rides],
          nextPage: current.nextPage + 1,
          hasNext: page.hasNext,
          isLoadingMore: false,
        ),
      );
    } catch (_) {
      state = AsyncData(
        current.copyWith(isLoadingMore: false, loadMoreFailed: true),
      );
    }
  }
}

final ridesControllerProvider =
    AsyncNotifierProvider<RidesController, RidesState>(
      RidesController.new,
      retry: (_, _) => null,
    );
