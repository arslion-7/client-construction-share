import { IGeneralContractor } from '@/features/generalContractors/types';
import type { TableProps } from 'antd';

export function useColumns() {
  const columns: TableProps<IGeneralContractor>['columns'] = [
    {
      title: 'tb',
      dataIndex: 'tb',
      key: 'tb'
    },
    {
      title: 'org_name',
      dataIndex: 'org_name',
      key: 'org_name'
    }
  ];

  return columns;
}
