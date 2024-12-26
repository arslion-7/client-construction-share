import { IContractor } from '@/features/generalContractors/types';
import { usePaginationSearch } from '@/utils/hooks/paramsHooks';
import { Table } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd';
import { FilterValue } from 'antd/es/table/interface';
import { useColumns } from './hooks';
import { PaginatedResponse } from '@/utils/responseUtils';

export default function GeneralContractorsTable({
  paginatedData,
}: {
  paginatedData: PaginatedResponse<IContractor[]>;
}) {
  const { onChangePagination, getPagination } = usePaginationSearch();

  const columns = useColumns();

  const onChangeFilters = (filters: Record<string, FilterValue | null>) => {
    console.log('filters', filters);
  };

  const onChange: TableProps<IContractor>['onChange'] = (
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
      pagination={getPagination<IContractor[]>(paginatedData!)}
      onChange={onChange}
    />
  );
}
