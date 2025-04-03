import { Button, type TableProps } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { IRegistry } from '@/features/registries/types';
import { UndefinedTag } from '@/components/table/UndefinedTag';

export function useColumns() {
  const navigate = useNavigate();

  const columns: TableProps<IRegistry>['columns'] = [
    // {
    //   title: 'id',
    //   dataIndex: 'id',
    //   key: 'id',
    // },
    {
      title: 'PGGŞ №',
      dataIndex: 't_b',
      key: 't_b',
    },
    {
      title: 'Baş potratçy',
      key: 'general_contractor',
      render: (_, record) => (
        <>
          {record.general_contractor ? (
            record.general_contractor.org_name
          ) : (
            <UndefinedTag />
          )}
        </>
      ),
    },
    {
      title: 'Ulanyjy',
      key: 'user',
      render: (_, record) => (
        <>{record.user ? record.user.email : <UndefinedTag />}</>
      ),
    },
    {
      title: 'Hekeket',
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
      ),
    },
  ];

  return columns;
}
