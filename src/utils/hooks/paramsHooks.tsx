import type { TablePaginationConfig } from 'antd';
import { useSearchParams } from 'react-router';
import { PaginatedResponse } from '../responseUtils';

export function usePagination() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');

  const setPagePageSize = ({
    pageSize,
    current,
  }: {
    pageSize: number | TablePaginationConfig;
    current: number;
  }) => {
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('page', current.toString());
    setSearchParams(searchParams);
  };

  const onChangePagination = (pagination: TablePaginationConfig) => {
    const { pageSize = pagination, current = 1 } = pagination;
    setPagePageSize({ pageSize, current });
  };

  function getPagination<T>(paginatedData: PaginatedResponse<T>) {
    return {
      current: Number(page),
      pageSize: Number(pageSize) || paginatedData?.pageSize,
      total: paginatedData?.total,
      showSizeChanger: true,
    };
  }

  return {
    page,
    pageSize,
    setPagePageSize,
    onChangePagination,
    getPagination,
  };
}
