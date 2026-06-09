export interface ApiResponse<T> {
  status: '1' | '0';
  msg: string;
  data?: T;
}

export interface PaginatedData<T> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  [key: string]: T[] | number;
}
