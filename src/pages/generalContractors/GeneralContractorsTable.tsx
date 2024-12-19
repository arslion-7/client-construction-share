import { useGetGeneralContractorsQuery } from '@/features/generalContractors/generalContractorsApiSlice';
import { IGeneralContractor } from '@/features/generalContractors/types';
import { Spin, Table } from 'antd';
import type { TableProps } from 'antd';

export default function GeneralContractorsTable() {
  const { data: generalContractors, isLoading: isLoadingGeneralContractors } =
    useGetGeneralContractorsQuery();

  if (isLoadingGeneralContractors) return <Spin />;

  const columns: TableProps<IGeneralContractor>['columns'] = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'org_name',
      dataIndex: 'org_name',
      key: 'org_name',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={generalContractors?.results}
      pagination={false}
    />
  );
}
