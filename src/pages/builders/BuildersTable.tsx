import { usePaginationSearch } from '@/utils/hooks/paramsHooks';
import { Table } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd';
import { FilterValue } from 'antd/es/table/interface';
import { PaginatedResponse } from '@/utils/responseUtils';
import { IBuilder } from '@/features/builders/types';
import { useColumns } from './hooks';

export default function BuildersTable({
  paginatedData,
}: {
  paginatedData: PaginatedResponse<IBuilder[]>;
}) {
  const { onChangePagination, getPagination } = usePaginationSearch();

  const columns = useColumns();

  const onChangeFilters = (filters: Record<string, FilterValue | null>) => {
    console.log('filters', filters);
  };

  const onChange: TableProps<IBuilder>['onChange'] = (
    pagination: TablePaginationConfig,
    filters
    // sorter: any,
    // extra: TableCurrentDataSource<DataType>
  ) => {
    onChangePagination(pagination);
    onChangeFilters(filters);
  };

  return (
    <Table
      rowKey='id'
      // @ts-expect-error
      columns={columns}
      dataSource={paginatedData?.data}
      pagination={getPagination<IBuilder[]>(paginatedData!)}
      onChange={onChange}
    />
  );
}
