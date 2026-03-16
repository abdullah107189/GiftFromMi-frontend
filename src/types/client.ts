export interface IClientRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  town_city: string;
  district: string;
  street_address: string;
  postcode: string;
  order_notes: string;
}

export interface IBulkClientSelection {
  fileName: string;
  headers: string[];
  rows: Record<string, string>[];
  csvContent: string;
}
