import { useGetGeneralContractorsQuery } from '@/features/generalContractors/generalContractorsApiSlice';
import { IGeneralContractor } from '@/features/generalContractors/types';
import { usePagination } from '@/utils/hooks/paramsHooks';
import { Spin, Table } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd';
import { FilterValue } from 'antd/es/table/interface';

export default function GeneralContractorsTable() {
  const { page, pageSize, onChangePagination, getPagination } = usePagination();

  const { data: paginatedData, isLoading: isLoadingGeneralContractors } =
    useGetGeneralContractorsQuery({
      page,
      pageSize,
    });

  if (isLoadingGeneralContractors) return <Spin />;

  const columns: TableProps<IGeneralContractor>['columns'] = [
    {
      title: 'tb',
      dataIndex: 'tb',
      key: 'tb',
    },
    {
      title: 'org_name',
      dataIndex: 'org_name',
      key: 'org_name',
    },
  ];

  const onChangeFilters = (filters: Record<string, FilterValue | null>) => {
    console.log('filters', filters);
  };

  const onChange: TableProps<IGeneralContractor>['onChange'] = (
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
      columns={columns}
      dataSource={paginatedData?.data}
      pagination={getPagination<IGeneralContractor[]>(paginatedData!)}
      onChange={onChange}
    />
  );
}
