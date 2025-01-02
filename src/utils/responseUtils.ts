export interface PaginatedResponse<T> {
  data: T;
  page: number;
  pageSize: number;
  total: number;
}

// export interface PaginatedResponse<T> {
//   results: T;
//   next?: null | string;
//   previous?: null | string;
//   count: number;
// }

export interface CascaderOption {
  value: string;
  label: string;
  children?: CascaderOption[];
}
