export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  category?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, item: InventoryItem) => React.ReactNode;
}

export interface FilterOption {
  key: string;
  label: string;
  value: string | number;
}
