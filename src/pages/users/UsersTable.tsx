import { IUser } from '@/features/users/types';
import { useGetUsersQuery } from '@/features/users/usersApiSlice';
import { EditOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';

import type { TableProps } from 'antd';
import { useNavigate } from 'react-router';

export default function UsersTable() {
  const { data: users } = useGetUsersQuery({ show: '' });
  const navigate = useNavigate();

  const columns: TableProps<IUser>['columns'] = [
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'full_name',
      dataIndex: 'full_name',
      key: 'full_name',
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
      ),
    },
  ];

  return (
    <Table
      rowKey='id'
      columns={columns}
      dataSource={users}
      pagination={false}
    />
  );
}
