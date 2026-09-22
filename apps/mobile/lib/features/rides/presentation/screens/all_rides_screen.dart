import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:zynqly_mobile/core/theme/app_spacing.dart';
import 'package:zynqly_mobile/features/auth/application/dev_session_provider.dart';
import 'package:zynqly_mobile/features/rides/application/rides_controller.dart';
import 'package:zynqly_mobile/features/rides/presentation/widgets/ride_card.dart';

class AllRidesScreen extends ConsumerStatefulWidget {
  const AllRidesScreen({super.key});

  @override
  ConsumerState<AllRidesScreen> createState() => _AllRidesScreenState();
}

class _AllRidesScreenState extends ConsumerState<AllRidesScreen> {
  final _scrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_loadMoreNearEnd);
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  void _loadMoreNearEnd() {
    if (_scrollController.position.extentAfter < 300) {
      ref.read(ridesControllerProvider.notifier).loadMore();
    }
  }

  /// Signs in again and reloads the first page.
  Future<void> _reload() async {
    ref.invalidate(devSessionProvider);
    try {
      await ref.read(ridesControllerProvider.future);
    } catch (_) {
      // The error state of the controller is shown by the screen itself.
    }
  }

  @override
  Widget build(BuildContext context) {
    final rides = ref.watch(ridesControllerProvider);
    final colorScheme = Theme.of(context).colorScheme;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Fahrtenbuch'),
        actions: [
          // Placeholder for the "This Week" filter, not wired up yet.
          TextButton.icon(
            onPressed: () {},
            icon: Icon(Icons.expand_more, color: colorScheme.onSurface),
            label: Text(
              'This Week',
              style: TextStyle(color: colorScheme.onSurface),
            ),
          ),
        ],
      ),
      body: rides.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, _) =>
            _ErrorView(message: _errorMessage(error), onRetry: _reload),
        data: (state) {
          if (state.rides.isEmpty) {
            return const Center(child: Text('Keine Fahrten vorhanden'));
          }
          final showFooter = state.hasNext || state.loadMoreFailed;
          return RefreshIndicator(
            onRefresh: _reload,
            child: ListView.builder(
              controller: _scrollController,
              padding: const EdgeInsets.all(AppSpacing.md),
              itemCount: state.rides.length + (showFooter ? 1 : 0),
              itemBuilder: (context, index) {
                if (index < state.rides.length) {
                  return RideCard(ride: state.rides[index]);
                }
                return _Footer(
                  failed: state.loadMoreFailed,
                  onRetry: () =>
                      ref.read(ridesControllerProvider.notifier).loadMore(),
                );
              },
            ),
          );
        },
      ),
    );
  }

  static String _errorMessage(Object error) {
    if (error is StateError) return error.message;
    if (error is DioException) {
      if (error.response?.statusCode == 401) {
        return 'Anmeldung fehlgeschlagen oder abgelaufen.';
      }
      if (error.type == DioExceptionType.connectionError ||
          error.type == DioExceptionType.connectionTimeout) {
        return 'Server nicht erreichbar.';
      }
    }
    return 'Die Fahrten konnten nicht geladen werden.';
  }
}

class _ErrorView extends StatelessWidget {
  const _ErrorView({required this.message, required this.onRetry});

  final String message;
  final VoidCallback onRetry;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(message, textAlign: TextAlign.center),
            const SizedBox(height: AppSpacing.lg),
            FilledButton(
              onPressed: onRetry,
              child: const Text('Erneut versuchen'),
            ),
          ],
        ),
      ),
    );
  }
}

class _Footer extends StatelessWidget {
  const _Footer({required this.failed, required this.onRetry});

  final bool failed;
  final VoidCallback onRetry;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: AppSpacing.lg),
      child: Center(
        child: failed
            ? TextButton(
                onPressed: onRetry,
                child: const Text('Erneut versuchen'),
              )
            : const CircularProgressIndicator(),
      ),
    );
  }
}
