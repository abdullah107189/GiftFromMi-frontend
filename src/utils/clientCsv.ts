import type { IBulkClientSelection, IClientRecord } from "@/types/client";

export const CLIENT_CSV_HEADERS = [
  "name",
  "email",
  "phone",
  "country",
  "town_city",
  "district",
  "street_address",
  "postcode",
] as const;

const escapeCsvValue = (value: string) => {
  const normalized = String(value ?? "");
  if (/[",\n]/.test(normalized)) {
    return `"${normalized.replace(/"/g, '""')}"`;
  }

  return normalized;
};

export const clientToCheckoutRow = (
  client: IClientRecord,
): Record<string, string> => ({
  name: client.name,
  email: client.email,
  phone: client.phone,
  // Checkout bulk flow still expects the older CSV field names.
  // We map the new client schema into that stable payload here.
  country: client.country_code || client.country,
  town_city: client.town,
  district: client.district,
  street_address: client.street_address,
  postcode: client.postal_code,
});

export const buildBulkClientSelection = (
  clients: IClientRecord[],
): IBulkClientSelection => {
  const rows = clients.map(clientToCheckoutRow);
  const headers = [...CLIENT_CSV_HEADERS];
  const csvLines = [
    headers.join(","),
    ...rows.map((row) =>
      headers.map((header) => escapeCsvValue(row[header] ?? "")).join(","),
    ),
  ];

  return {
    fileName: `clients-bulk-${Date.now()}.csv`,
    headers,
    rows,
    csvContent: csvLines.join("\n"),
  };
};
