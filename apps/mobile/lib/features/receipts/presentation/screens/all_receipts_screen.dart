import 'package:flutter/material.dart';
import 'package:zynqly_mobile/core/theme/app_spacing.dart';
import 'package:zynqly_mobile/features/receipts/data/dummy_receipts.dart';
import 'package:zynqly_mobile/features/receipts/presentation/widgets/receipt_card.dart';

class AllReceiptsScreen extends StatelessWidget {
  const AllReceiptsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Alle Rechnungen')),
      body: dummyReceipts.isEmpty
          ? const Center(child: Text('Keine Rechnungen vorhanden'))
          : ListView.builder(
              padding: const EdgeInsets.all(AppSpacing.md),
              itemCount: dummyReceipts.length,
              itemBuilder: (context, index) =>
                  ReceiptCard(receipt: dummyReceipts[index]),
            ),
    );
  }
}
