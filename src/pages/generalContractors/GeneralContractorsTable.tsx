import { useGetGeneralContractorsQuery } from '@/features/generalContractors/generalContractorsApiSlice';
import { IGeneralContractor } from '@/features/generalContractors/types';
import { Spin, Table } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd';
import { FilterValue } from 'antd/es/table/interface';
import { useSearchParams } from 'react-router';

export default function GeneralContractorsTable() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: paginatedData, isLoading: isLoadingGeneralContractors } =
    useGetGeneralContractorsQuery();

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

  const onChangePagination = (pagination: TablePaginationConfig) => {
    const { pageSize = pagination, current = 1 } = pagination;
    searchParams.set('pageSize', pageSize.toString());
    searchParams.set('page', current.toString());
    setSearchParams(searchParams);
  };

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
      pagination={{
        current: Number(searchParams.get('page')),
        pageSize:
          Number(searchParams.get('pageSize')) || paginatedData?.pageSize,
        total: paginatedData?.total,
        showSizeChanger: true,
      }}
      onChange={onChange}
    />
  );
}
