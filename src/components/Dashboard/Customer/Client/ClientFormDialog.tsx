import { useEffect, type ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { SharedSearchableSelect } from "@/components/shared/SharedSearchableSelect";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { IClientRecord } from "@/types/client";
import { countries } from "@/utils/countryCode";

const clientSchema = z.object({
  key: z.string().trim().min(1, "Key is required"),
  name: z.string().trim().min(2, "Client name is required"),
  email: z.string().trim().email("Valid email is required"),
  phone: z.string().trim().min(7, "Phone number is required"),
  country: z.string().trim().min(2, "Country is required"),
  country_code: z.string().trim().min(2, "Country code is required"),
  town: z.string().trim().min(2, "Town is required"),
  district: z.string().trim().min(2, "District is required"),
  street_address: z.string().trim().min(5, "Street address is required"),
  postal_code: z.string().trim().min(2, "Postal code is required"),
});

export type ClientFormValues = z.infer<typeof clientSchema>;

const defaultFormValues: ClientFormValues = {
  key: "",
  name: "",
  email: "",
  phone: "",
  country: "",
  country_code: "",
  town: "",
  district: "",
  street_address: "",
  postal_code: "",
};

const countryOptions = countries.map((country) => ({
  label: `${country.label} (${country.value.toUpperCase()})`,
  value: country.value.toUpperCase(),
}));

type ClientFormDialogProps = {
  open: boolean;
  editingClient: IClientRecord | null;
  isBusy: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ClientFormValues) => Promise<void> | void;
};

export default function ClientFormDialog({
  open,
  editingClient,
  isBusy,
  onOpenChange,
  onSubmit,
}: ClientFormDialogProps) {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if (!open) return;

    if (!editingClient) {
      reset(defaultFormValues);
      return;
    }

    reset({
      key: editingClient.key,
      name: editingClient.name,
      email: editingClient.email,
      phone: editingClient.phone,
      country: editingClient.country,
      country_code: editingClient.country_code,
      town: editingClient.town,
      district: editingClient.district,
      street_address: editingClient.street_address,
      postal_code: editingClient.postal_code,
    });
  }, [editingClient, open, reset]);

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      reset(defaultFormValues);
    }
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl! rounded-[28px] border-slate-200 bg-white p-0">
        <DialogHeader className="border-b border-slate-200 px-6 py-5 md:px-8">
          <DialogTitle className="text-2xl font-semibold text-slate-950">
            {editingClient ? "Update Client" : "Add New Client"}
          </DialogTitle>
          <DialogDescription className="text-sm leading-6 text-slate-600">
            Fill the same fields that your future API or CSV import will send.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 px-6 py-6 md:px-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Key" error={errors.key?.message}>
              <Input
                {...register("key")}
                placeholder="Enter unique key"
                className="h-12 rounded-2xl border-slate-200 bg-slate-50 shadow-none focus-visible:ring-primary/20"
              />
            </Field>

            <Field label="Name" error={errors.name?.message}>
              <Input
                {...register("name")}
                placeholder="Enter name"
                className="h-12 rounded-2xl border-slate-200 bg-slate-50 shadow-none focus-visible:ring-primary/20"
              />
            </Field>

            <Field label="Email Address" error={errors.email?.message}>
              <Input
                {...register("email")}
                placeholder="Enter email address"
                className="h-12 rounded-2xl border-slate-200 bg-slate-50 shadow-none focus-visible:ring-primary/20"
              />
            </Field>

            <Field label="Phone Number" error={errors.phone?.message}>
              <Input
                {...register("phone")}
                placeholder="Enter phone number"
                className="h-12 rounded-2xl border-slate-200 bg-slate-50 shadow-none focus-visible:ring-primary/20"
              />
            </Field>

            <Field label="Country" error={errors.country?.message}>
              <Input
                {...register("country")}
                placeholder="Enter country name"
                className="h-12 rounded-2xl border-slate-200 bg-slate-50 shadow-none focus-visible:ring-primary/20"
              />
            </Field>

            <Field label="Country Code" error={errors.country_code?.message}>
              <Controller
                control={control}
                name="country_code"
                render={({ field }) => (
                  <SharedSearchableSelect
                    options={countryOptions}
                    value={field.value}
                    onChange={field.onChange}
                    isClearable
                    placeholder="Select country code"
                    className="min-h-12!"
                  />
                )}
              />
            </Field>

            <Field label="Town" error={errors.town?.message}>
              <Input
                {...register("town")}
                placeholder="Enter town"
                className="h-12 rounded-2xl border-slate-200 bg-slate-50 shadow-none focus-visible:ring-primary/20"
              />
            </Field>

            <Field label="District" error={errors.district?.message}>
              <Input
                {...register("district")}
                placeholder="Enter district"
                className="h-12 rounded-2xl border-slate-200 bg-slate-50 shadow-none focus-visible:ring-primary/20"
              />
            </Field>

            <Field label="Street Address" error={errors.street_address?.message}>
              <Input
                {...register("street_address")}
                placeholder="Enter street address"
                className="h-12 rounded-2xl border-slate-200 bg-slate-50 shadow-none focus-visible:ring-primary/20"
              />
            </Field>

            <Field label="Postal Code" error={errors.postal_code?.message}>
              <Input
                {...register("postal_code")}
                placeholder="Enter postal code"
                className="h-12 rounded-2xl border-slate-200 bg-slate-50 shadow-none focus-visible:ring-primary/20"
              />
            </Field>
          </div>

          <DialogFooter className="border-t border-slate-200 pt-5">
            <Button
              type="button"
              variant="outline"
              disabled={isBusy}
              className="border-slate-300"
              onClick={() => handleClose(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isBusy}>
              {isBusy
                ? "Saving..."
                : editingClient
                  ? "Save Client"
                  : "Create Client"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-slate-700">{label}</Label>
      {children}
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
    </div>
  );
}
