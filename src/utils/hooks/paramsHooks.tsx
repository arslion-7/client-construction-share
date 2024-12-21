import type { TablePaginationConfig } from 'antd';
import { useSearchParams } from 'react-router';
import { PaginatedResponse } from '../responseUtils';
import { paginationInit } from '../requestUtils';

export function usePaginationSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');
  const search = searchParams.get('search');

  const setPagePageSize = ({
    pageSize,
    current
  }: {
    pageSize: number | TablePaginationConfig;
    current: number | string;
  }) => {
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('page', current.toString());
    setSearchParams(searchParams);
  };

  const onChangePagination = (pagination: TablePaginationConfig) => {
    const { pageSize = pagination, current = paginationInit.page } = pagination;
    setPagePageSize({ pageSize, current });
  };

  function getPagination<T>(paginatedData: PaginatedResponse<T>) {
    return {
      current: Number(page) || Number(paginationInit.page),
      pageSize: Number(pageSize) || paginatedData?.pageSize,
      // pageSize: 2,
      total: paginatedData?.total,
      showSizeChanger: true
    };
  }

  return {
    page: page || paginationInit.page,
    pageSize: pageSize || paginationInit.pageSize,
    search: search || paginationInit.search,
    setPagePageSize,
    onChangePagination,
    getPagination
  };
}
