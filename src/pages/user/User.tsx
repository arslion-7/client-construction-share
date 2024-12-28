import { Card, Flex, Skeleton, Tabs } from 'antd';
import UserForm from './UserForm';
import UsersBreadcrumb from '../users/UsersBreadcrumb';
import { useGetUserQuery } from '@/features/users/usersApiSlice';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import type { TabsProps } from 'antd';
import { useSearchParams } from 'react-router';
import ResetPasswordForm from './ResetPasswordForm';

export default function User() {
  const { id, isNew } = useIsNew();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: user, isLoading } = useGetUserQuery(id!, { skip: isNew });

  const onChange = (key: string) => {
    searchParams.set('tab', key);
    setSearchParams(searchParams);
  };

  const items: TabsProps['items'] = [
    {
      key: 'main',
      label: 'Esasy',
      children: (
        <Card>
          <UserForm user={user!} />
        </Card>
      )
    },
    {
      key: 'reset_password',
      label: 'Açar sözüni çalyşmak',
      children: (
        <Card>
          <ResetPasswordForm />
        </Card>
      ),
      disabled: isNew
    }
  ];

  if (isLoading) return <Skeleton />;

  return (
    <Flex vertical gap={16}>
      <UsersBreadcrumb withLeftArrow withId />
      <Tabs
        defaultActiveKey={searchParams.get('tab') || 'main'}
        items={items}
        onChange={onChange}
      />
    </Flex>
  );
}
