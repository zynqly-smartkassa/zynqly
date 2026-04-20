"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateInvoiceMutation } from "@/redux/api/apis/invoices";

interface CreateInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateInvoiceDialog({ open, onOpenChange }: CreateInvoiceDialogProps) {
  const [rideId, setRideId] = useState("");
  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState("");

  const [createInvoice, { isLoading }] = useCreateInvoiceMutation();

  const canSubmit = rideId.trim() !== "" && customer.trim() !== "" && amount.trim() !== "";

  function handleClose() {
    setRideId("");
    setCustomer("");
    setAmount("");
    onOpenChange(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    try {
      await createInvoice({
        rideId: rideId.trim(),
        customer: customer.trim(),
        amount: parseFloat(amount),
      }).unwrap();
      handleClose();
    } catch {
      // Error handling will be added once backend is ready
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rechnung erstellen</DialogTitle>
          <DialogDescription>
            Erstelle eine neue Rechnung für eine abgeschlossene Fahrt.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Ride ID */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="rideId" className="text-sm font-medium text-z-neutral-700 dark:text-z-neutral-200">
              Fahrt-ID
            </Label>
            <Input
              id="rideId"
              placeholder="z.B. R-1042"
              value={rideId}
              onChange={(e) => setRideId(e.target.value)}
              className="h-9 text-sm bg-white dark:bg-z-neutral-800 border-z-neutral-200 dark:border-z-neutral-700 text-z-neutral-900 dark:text-z-neutral-50 placeholder:text-z-neutral-400 dark:placeholder:text-z-neutral-500"
            />
          </div>

          {/* Customer */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="customer" className="text-sm font-medium text-z-neutral-700 dark:text-z-neutral-200">
              Kunde
            </Label>
            <Input
              id="customer"
              placeholder="z.B. Max Müller"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="h-9 text-sm bg-white dark:bg-z-neutral-800 border-z-neutral-200 dark:border-z-neutral-700 text-z-neutral-900 dark:text-z-neutral-50 placeholder:text-z-neutral-400 dark:placeholder:text-z-neutral-500"
            />
          </div>

          {/* Amount */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="amount" className="text-sm font-medium text-z-neutral-700 dark:text-z-neutral-200">
              Betrag (€)
            </Label>
            <Input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              placeholder="z.B. 42.50"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-9 text-sm bg-white dark:bg-z-neutral-800 border-z-neutral-200 dark:border-z-neutral-700 text-z-neutral-900 dark:text-z-neutral-50 placeholder:text-z-neutral-400 dark:placeholder:text-z-neutral-500"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              className="text-sm text-z-neutral-600 dark:text-z-neutral-300"
              disabled={isLoading}
            >
              Abbrechen
            </Button>
            <Button
              type="submit"
              disabled={!canSubmit || isLoading}
              className="bg-z-violet-500 hover:bg-z-violet-600 text-white dark:bg-z-violet-500 dark:hover:bg-z-violet-600 text-sm"
            >
              {isLoading ? "Wird erstellt…" : "Erstellen"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
