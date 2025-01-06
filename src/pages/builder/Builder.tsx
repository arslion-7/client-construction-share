import { useIsNew } from '@/utils/hooks/paramsHooks';
import { Card, Flex, Skeleton } from 'antd';

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useSearchParams } from 'react-router';
import BuildersBreadcrumb from '../builders/BuildersBreadcrumb';
import { useGetBuilderQuery } from '@/features/builders/buildersApiSlice';
import BuilderAddress from './BuilderAddress';
// import BuilderAddress from './BuilderAddress';
// import BuilderMain from './BuilderMain';

export default function Builder() {
  const { isNew, id } = useIsNew();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: builder, isLoading: isLoadingBuilder } = useGetBuilderQuery(
    id!,
    { skip: isNew }
  );

  if (isLoadingBuilder) return <Skeleton />;

  const onChange = (key: string) => {
    searchParams.set('tab', key);
    setSearchParams(searchParams);
  };

  const items: TabsProps['items'] = [
    {
      key: 'address',
      label: 'Adres maglumaty',
      children: (
        <Card>
          <BuilderAddress builder={builder!} />
        </Card>
      )
    },
    {
      key: 'main',
      label: 'Esasy maglumaty',
      children: <Card>{/* <BuilderMain builder={builder!} /> */}</Card>,
      disabled: isNew
    }
  ];

  return (
    <Flex vertical gap={16}>
      <BuildersBreadcrumb withLeftArrow withId />
      <Tabs
        defaultActiveKey={searchParams.get('tab') || 'address'}
        items={items}
        onChange={onChange}
      />
    </Flex>
  );
}
