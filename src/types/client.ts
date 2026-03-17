export interface IClientRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  country_code: string;
  town: string;
  district: string;
  street_address: string;
  postal_code: string;
}

export interface IBulkClientSelection {
  fileName: string;
  headers: string[];
  rows: Record<string, string>[];
  csvContent: string;
}
