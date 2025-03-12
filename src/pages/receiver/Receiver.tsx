import { useGetReceiverQuery } from '@/features/receivers/receiversApiSlice';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { Card, Flex, Skeleton, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useSearchParams } from 'react-router';
import ReceiversBreadcrumb from '../receivers/BuildingsBreadcrumb';
import ReceiverMain from './ReceiverMain';

export default function Receiver() {
  const { isNew, id } = useIsNew();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: receiver, isLoading: isLoadingReceiver } = useGetReceiverQuery(
    id!,
    { skip: isNew }
  );

  if (isLoadingReceiver) return <Skeleton />;
  const onChange = (key: string) => {
    searchParams.set('tab', key);
    setSearchParams(searchParams);
  };

  const items: TabsProps['items'] = [
    {
      key: 'org',
      label: 'Esasy maglumaty',
      children: (
        <Card>
          <ReceiverMain receiver={receiver!} />
        </Card>
      ),
    },
  ];

  return (
    <Flex vertical gap={16}>
      <ReceiversBreadcrumb withLeftArrow withId />
      <Tabs
        defaultActiveKey={searchParams.get('tab') || 'org'}
        items={items}
        onChange={onChange}
      />
    </Flex>
  );
}
