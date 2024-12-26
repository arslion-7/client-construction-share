import { Card, Flex, Skeleton, Tabs } from 'antd';
import type { TabsProps } from 'antd';

import { useIsNew } from '@/utils/hooks/paramsHooks';
import RegistriesBreadcrumb from '../registries/RegistriesBreadcrumb';
import { useSearchParams } from 'react-router';
import { useEffect } from 'react';
import {
  useCreateRegistryMutation,
  useGetRegistryQuery,
} from '@/features/registries/registriesApiSlice';
import RegistryMain from './RegistryMain';

export default function Registry() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { isNew, id } = useIsNew();

  const { data: registry, isLoading } = useGetRegistryQuery(id!, {
    skip: isNew,
  });

  console.log('registry', registry);

  const [createRegistry, { isLoading: isLoadingCreate }] =
    useCreateRegistryMutation();

  useEffect(() => {
    if (isNew) {
      const onCreate = async () => {
        await createRegistry();
      };

      onCreate().catch(console.error);
    }
  }, [createRegistry, isNew]);

  if (isLoadingCreate || isLoading) return <Skeleton />;

  const onChange = (key: string) => {
    searchParams.set('tab', key);
    setSearchParams(searchParams);
  };

  const items: TabsProps['items'] = [
    {
      key: 'main',
      label: 'Esasy',
      children: <Card>{!isNew && <RegistryMain registry={registry!} />}</Card>,
    },
    {
      key: 'old',
      label: 'Öňki',
      children: <Card></Card>,
      disabled: true,
    },
  ];

  return (
    <>
      <Flex vertical gap={16}>
        <RegistriesBreadcrumb withLeftArrow withId />
        <Tabs
          defaultActiveKey={searchParams.get('tab') || 'main'}
          items={items}
          onChange={onChange}
        />
      </Flex>
    </>
  );
}
