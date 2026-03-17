export const BULK_CSV_REQUIRED_HEADERS = [
  "name",
  "email",
  "phone",
  "country",
  "town_city",
  "district",
  "street_address",
  "postcode",
] as const;

export const BULK_CSV_OPTIONAL_HEADERS = ["order_notes"] as const;

const normalizeHeader = (header: string) =>
  header.trim().toLowerCase().replace(/\s+/g, "_");

export const getBulkCsvTemplateLabel = () =>
  BULK_CSV_REQUIRED_HEADERS.join(", ");

export const validateBulkCsvHeaders = (headers: string[]) => {
  const normalizedHeaders = headers.map(normalizeHeader);
  const uniqueHeaders = Array.from(new Set(normalizedHeaders));
  const missingHeaders = BULK_CSV_REQUIRED_HEADERS.filter(
    (header) => !uniqueHeaders.includes(header),
  );
  const allowedHeaders: string[] = [
    ...BULK_CSV_REQUIRED_HEADERS,
    ...BULK_CSV_OPTIONAL_HEADERS,
  ];
  const unexpectedHeaders = uniqueHeaders.filter(
    (header) => !allowedHeaders.includes(header),
  );

  if (missingHeaders.length === 0 && unexpectedHeaders.length === 0) {
    return {
      isValid: true,
      normalizedHeaders,
      missingHeaders,
      unexpectedHeaders,
      message: "",
    };
  }

  const parts: string[] = [];

  if (missingHeaders.length > 0) {
    parts.push(`Missing fields: ${missingHeaders.join(", ")}`);
  }

  if (unexpectedHeaders.length > 0) {
    parts.push(`Unexpected fields: ${unexpectedHeaders.join(", ")}`);
  }

  parts.push(`Use this template: ${getBulkCsvTemplateLabel()}`);

  return {
    isValid: false,
    normalizedHeaders,
    missingHeaders,
    unexpectedHeaders,
    message: parts.join(". "),
  };
};
