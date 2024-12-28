import { IUserResponse } from '@/features/users/types';
import { useGetUsersQuery } from '@/features/users/usersApiSlice';
import { Table } from 'antd';

import type { TableProps } from 'antd';

export default function UsersTable() {
  const { data: users } = useGetUsersQuery({ show: '' });

  const columns: TableProps<IUserResponse>['columns'] = [
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email'
    }
  ];

  return <Table rowKey='id' columns={columns} dataSource={users} />;
}
