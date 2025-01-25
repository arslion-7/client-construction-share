import { usePaginationSearch } from '@/utils/hooks/paramsHooks';
import { Table } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd';
import { FilterValue } from 'antd/es/table/interface';
import { useColumns } from './hooks';
import { PaginatedResponse } from '@/utils/responseUtils';
import { IBuilding } from '@/features/buildings/types';

export default function BuildingsTable({
  paginatedData,
}: {
  paginatedData: PaginatedResponse<IBuilding[]>;
}) {
  const { onChangePagination, getPagination } = usePaginationSearch();

  const columns = useColumns();

  const onChangeFilters = (filters: Record<string, FilterValue | null>) => {
    console.log('filters', filters);
  };

  const onChange: TableProps<IBuilding>['onChange'] = (
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
      pagination={getPagination<IBuilding[]>(paginatedData!)}
      onChange={onChange}
    />
  );
}
