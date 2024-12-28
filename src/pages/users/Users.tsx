import { Flex } from 'antd';
import UsersTable from './UsersTable';
import TableHeader from '@/components/TableHeader/TableHeader';
import UsersBreadcrumb from './UsersBreadcrumb';

export default function Users() {
  return (
    <Flex vertical gap={16}>
      <UsersBreadcrumb />
      <TableHeader />
      <UsersTable />
    </Flex>
  );
}
