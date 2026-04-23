"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

// ── Schema ─────────────────────────────────────────────────────────────────────

const createInvoiceSchema = z.object({
  rideId: z
    .string()
    .min(1, "Fahrt-ID ist erforderlich")
    .regex(/^R-\d+$/, "Format muss R-{Nummer} sein, z.B. R-1042"),
  customer: z
    .string()
    .min(2, "Kundenname muss mindestens 2 Zeichen haben")
    .max(100, "Kundenname ist zu lang"),
  amount: z
    .number()
    .refine((n) => !isNaN(n), { message: "Betrag muss eine Zahl sein" })
    .positive("Betrag muss größer als 0 sein")
    .max(9999.99, "Betrag darf maximal 9.999,99 € sein"),
});

type CreateInvoiceFormValues = z.infer<typeof createInvoiceSchema>;

// ── Props ──────────────────────────────────────────────────────────────────────

interface CreateInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// ── Component ──────────────────────────────────────────────────────────────────

export function CreateInvoiceDialog({ open, onOpenChange }: CreateInvoiceDialogProps) {
  const [createInvoice, { isLoading }] = useCreateInvoiceMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CreateInvoiceFormValues>({
    resolver: zodResolver(createInvoiceSchema),
    mode: "onChange",
  });

  function handleClose() {
    reset();
    onOpenChange(false);
  }

  async function onSubmit(data: CreateInvoiceFormValues) {
    // TODO: dein Code hier
    await createInvoice(data).unwrap();
    handleClose();
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

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Ride ID */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="rideId" className="text-sm font-medium text-z-neutral-700 dark:text-z-neutral-200">
              Fahrt-ID
            </Label>
            <Input
              id="rideId"
              placeholder="z.B. R-1042"
              {...register("rideId")}
              className="h-9 text-sm bg-white dark:bg-z-neutral-800 border-z-neutral-200 dark:border-z-neutral-700 text-z-neutral-900 dark:text-z-neutral-50 placeholder:text-z-neutral-400 dark:placeholder:text-z-neutral-500"
            />
            {errors.rideId && (
              <p className="text-xs text-red-500">{errors.rideId.message}</p>
            )}
          </div>

          {/* Customer */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="customer" className="text-sm font-medium text-z-neutral-700 dark:text-z-neutral-200">
              Kunde
            </Label>
            <Input
              id="customer"
              placeholder="z.B. Max Müller"
              {...register("customer")}
              className="h-9 text-sm bg-white dark:bg-z-neutral-800 border-z-neutral-200 dark:border-z-neutral-700 text-z-neutral-900 dark:text-z-neutral-50 placeholder:text-z-neutral-400 dark:placeholder:text-z-neutral-500"
            />
            {errors.customer && (
              <p className="text-xs text-red-500">{errors.customer.message}</p>
            )}
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
              {...register("amount", { valueAsNumber: true })}
              className="h-9 text-sm bg-white dark:bg-z-neutral-800 border-z-neutral-200 dark:border-z-neutral-700 text-z-neutral-900 dark:text-z-neutral-50 placeholder:text-z-neutral-400 dark:placeholder:text-z-neutral-500"
            />
            {errors.amount && (
              <p className="text-xs text-red-500">{errors.amount.message}</p>
            )}
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
              disabled={!isValid || isLoading}
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
