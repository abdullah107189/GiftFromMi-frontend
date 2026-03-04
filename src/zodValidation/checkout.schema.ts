import { z } from "zod";

export const checkoutSchema = z.object({
  type: z.enum(["single", "bulk"]),
  name: z.string().min(2, "Name is required"),

  email: z.string().min(1, "Email is required").email("Invalid email"),

  phone: z.string().min(6, "Phone number required"),

  street_address: z.string().min(5, "Address required"),

  country: z.string().optional(),

  town_city: z.string().min(1, "City required"),

  district: z.string().min(1, "District required"),

  postcode: z.string().optional(),

  order_notes: z.string().optional(),

  shippingCountryCode: z.string().min(1, "Shipping country code required"),

  shippingCountry: z.string().min(1, "Shipping country required"),

  shippingProvince: z.string().min(1, "Shipping province required"),

  shippingCity: z.string().min(1, "Shipping city required"),

  shippingAddress: z.string().min(1, "Shipping address required"),

  logisticName: z.string().min(1, "Logistic name required"),

  fromCountryCode: z.string().min(1, "From country code required"),

  saveInfo: z.boolean().optional(),
});
export type CheckoutCustomerFormData = z.infer<typeof checkoutSchema>;
