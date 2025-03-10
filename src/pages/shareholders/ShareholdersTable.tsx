import { usePaginationSearch } from '@/utils/hooks/paramsHooks';
import { Table } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd';
import { FilterValue } from 'antd/es/table/interface';
import { PaginatedResponse } from '@/utils/responseUtils';
import { IShareholder } from '@/features/shareholders/types';
import { useColumns } from './hooks';

export default function ShareholdersTable({
  paginatedData
}: {
  paginatedData: PaginatedResponse<IShareholder[]>;
}) {
  const { onChangePagination, getPagination } = usePaginationSearch();

  const columns = useColumns();

  const onChangeFilters = (filters: Record<string, FilterValue | null>) => {
    console.log('filters', filters);
  };

  const onChange: TableProps<IShareholder>['onChange'] = (
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
      pagination={getPagination<IShareholder[]>(paginatedData!)}
      onChange={onChange}
    />
  );
}
