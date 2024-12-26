import { Button, type TableProps } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { IRegistry } from '@/features/registries/types';

export function useColumns() {
  const navigate = useNavigate();

  const columns: TableProps<IRegistry>['columns'] = [
    {
      title: 't_b',
      dataIndex: 't_b',
      key: 't_b'
    },
    {
      title: 'org_name',
      dataIndex: 'org_name',
      key: 'org_name'
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
            console.log('clicked', record.id);
            navigate(record.id.toString());
          }}
        />
      )
    }
  ];

  return columns;
}
