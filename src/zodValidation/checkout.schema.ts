import { z } from "zod";

export const checkoutSchema = z
  .object({
    type: z.enum(["single", "bulk"]),
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    street_address: z.string().optional(),
    country: z.string().optional(),
    town_city: z.string().optional(),
    district: z.string().optional(),
    postcode: z.string().optional(),
    order_notes: z.string().optional(),
    shippingCountryCode: z.string().optional(),
    shippingCountry: z.string().optional(),
    shippingProvince: z.string().optional(),
    shippingCity: z.string().optional(),
    shippingAddress: z.string().optional(),
    // logisticName: z.string().optional(),
    fromCountryCode: z.string().optional(),
    saveInfo: z.boolean().optional(),
    bulkFile: z.instanceof(File).optional(),
    bulkHeaders: z.array(z.string()).optional(),
    bulkRows: z.array(z.record(z.string(), z.string())).optional(),
    scheduled_at: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "single") {
      if (!data.name || data.name.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["name"],
          message: "Name is required",
        });
      }

      if (!data.email?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["email"],
          message: "Email is required",
        });
      } else if (!z.string().email().safeParse(data.email).success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["email"],
          message: "Invalid email",
        });
      }

      const requiredSingleFields: Array<[keyof typeof data, string]> = [
        ["phone", "Phone number required"],
        ["street_address", "Address required"],
        ["country", "Country required"],
        ["town_city", "City required"],
        ["district", "District required"],
        ["shippingCountryCode", "Shipping country code required"],
        ["shippingCountry", "Shipping country required"],
        ["shippingProvince", "Shipping province required"],
        ["shippingCity", "Shipping city required"],
        ["shippingAddress", "Shipping address required"],
        ["fromCountryCode", "From country code required"],
        ["scheduled_at", "Scheduled date is required"],
      ];

      requiredSingleFields.forEach(([field, message]) => {
        const value = data[field];

        if (typeof value !== "string" || !value.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [field],
            message,
          });
        }
      });
    }

    if (data.type === "bulk" && !(data.bulkFile instanceof File)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["bulkFile"],
        message: "Please upload a CSV file first.",
      });
    }
  });
export type CheckoutCustomerFormData = z.infer<typeof checkoutSchema>;
