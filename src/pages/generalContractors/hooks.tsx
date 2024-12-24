import { IGeneralContractor } from '@/features/generalContractors/types';
import { Button, type TableProps } from 'antd';
import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

export function useColumns() {
  const navigate = useNavigate();

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
    {
      title: 'edit',
      dataIndex: 'edit',
      key: 'edit',
      render: (_, record) => (
        <Button
          shape='circle'
          icon={<EditOutlined />}
          onClick={() => {
            console.log('clicked', record.tb);
            navigate(record.tb);
          }}
        />
      ),
    },
  ];

  return columns;
}
