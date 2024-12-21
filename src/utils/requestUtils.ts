export interface PaginatedRequest {
  page?: string | null;
  pageSize?: string | null;
  search?: string | null;
}

export const paginationInit = {
  page: '1',
  pageSize: '20',
  search: ''
};
