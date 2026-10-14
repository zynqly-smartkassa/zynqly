import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:zynqly_mobile/features/auth/application/dev_session_provider.dart';
import 'package:zynqly_mobile/features/rides/application/rides_controller.dart';
import 'package:zynqly_mobile/features/rides/data/ride_repository.dart';

import '../../../utils/fake_ride_repository.dart';

ProviderContainer _container(FakeRideRepository repository) {
  final container = ProviderContainer(
    overrides: [
      rideRepositoryProvider.overrideWithValue(repository),
      devSessionProvider.overrideWith((ref) async {}),
    ],
  );
  addTearDown(container.dispose);
  return container;
}

void main() {
  late FakeRideRepository repository;

  setUp(() {
    repository = FakeRideRepository([
      [buildRide('R-1'), buildRide('R-2')],
      [buildRide('R-3')],
    ]);
  });

  test('build loads the first page', () async {
    final container = _container(repository);

    final state = await container.read(ridesControllerProvider.future);

    expect(state.rides.map((ride) => ride.id), ['R-1', 'R-2']);
    expect(state.hasNext, isTrue);
    expect(state.nextPage, 1);
  });

  test('loadMore appends the next page and stops after the last', () async {
    final container = _container(repository);
    await container.read(ridesControllerProvider.future);
    final controller = container.read(ridesControllerProvider.notifier);

    await controller.loadMore();
    await controller.loadMore();

    final state = container.read(ridesControllerProvider).requireValue;
    expect(state.rides.map((ride) => ride.id), ['R-1', 'R-2', 'R-3']);
    expect(state.hasNext, isFalse);
    expect(repository.requestedPages, [0, 1]);
  });

  test('loadMore keeps the list and flags a failure on error', () async {
    final container = _container(repository);
    await container.read(ridesControllerProvider.future);
    repository.error = Exception('offline');

    await container.read(ridesControllerProvider.notifier).loadMore();

    final state = container.read(ridesControllerProvider).requireValue;
    expect(state.rides, hasLength(2));
    expect(state.loadMoreFailed, isTrue);
    expect(state.isLoadingMore, isFalse);
  });

  test('build ends in an error state when the first page fails', () async {
    repository.error = Exception('offline');
    final container = _container(repository);

    await expectLater(
      container.read(ridesControllerProvider.future),
      throwsException,
    );
    expect(container.read(ridesControllerProvider).hasError, isTrue);
  });
}
