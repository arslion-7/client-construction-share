import { usePaginationSearch } from '@/utils/hooks/paramsHooks';
import { Table } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd';
import { FilterValue } from 'antd/es/table/interface';
import { useColumns } from './hooks';
import { PaginatedResponse } from '@/utils/responseUtils';
import { IReceiver } from '@/features/receivers/types';

export default function ReceiversTable({
  paginatedData,
}: {
  paginatedData: PaginatedResponse<IReceiver[]>;
}) {
  const { onChangePagination, getPagination } = usePaginationSearch();

  const { columns, expandedRows, setExpandedRows } = useColumns();

  const onChangeFilters = (filters: Record<string, FilterValue | null>) => {
    console.log('filters', filters);
  };

  const onChange: TableProps<IReceiver>['onChange'] = (
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
      // @ts-expect-error - columns type mismatch
      columns={columns}
      dataSource={paginatedData?.data}
      pagination={getPagination<IReceiver[]>(paginatedData!)}
      onChange={onChange}
      onRow={(record) => ({
        onClick: () => {
          // Toggle expand state for this specific row
          const newExpandedRows = { ...expandedRows };
          newExpandedRows[record.t_b] = !newExpandedRows[record.t_b];
          setExpandedRows(newExpandedRows);
        },
        style: { cursor: 'pointer' },
      })}
    />
  );
}
