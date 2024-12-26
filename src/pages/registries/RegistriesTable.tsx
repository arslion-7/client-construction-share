import { usePaginationSearch } from '@/utils/hooks/paramsHooks';
import { Table } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd';
import { FilterValue } from 'antd/es/table/interface';
import { PaginatedResponse } from '@/utils/responseUtils';
import { useColumns } from './hooks';
import { IRegistry } from '@/features/registries/types';

export default function RegistriesTable({
  paginatedData
}: {
  paginatedData: PaginatedResponse<IRegistry[]>;
}) {
  const { onChangePagination, getPagination } = usePaginationSearch();

  const columns = useColumns();

  const onChangeFilters = (filters: Record<string, FilterValue | null>) => {
    console.log('filters', filters);
  };

  const onChange: TableProps<IRegistry>['onChange'] = (
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
      columns={columns}
      dataSource={paginatedData?.data}
      pagination={getPagination<IRegistry[]>(paginatedData!)}
      onChange={onChange}
    />
  );
}
