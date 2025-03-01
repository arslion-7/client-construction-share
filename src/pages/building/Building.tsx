import { useIsNew } from '@/utils/hooks/paramsHooks';
import { Card, Flex, Skeleton } from 'antd';

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useSearchParams } from 'react-router';
import BuildingsBreadcrumb from '../buildings/BuildingsBreadcrumb';
import { useGetBuildingQuery } from '@/features/buildings/buildingsApiSlice';
import BuildingAddress from './BuildingAddress';
import BuildingMain from './BuildingMain';
import BuildingOrder from './BuildingOrder';
import BuildingCert from './BuildingCert';
import BuildingSquare from './BuildingSquare';

export default function Building() {
  const { isNew, id } = useIsNew();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: building, isLoading: isLoadingBuilding } = useGetBuildingQuery(
    id!,
    { skip: isNew }
  );

  if (isLoadingBuilding) return <Skeleton />;

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
          <BuildingAddress building={building!} />
        </Card>
      ),
    },
    {
      key: 'main',
      label: 'Esasy maglumaty',
      children: (
        <Card>
          <BuildingMain building={building!} />
        </Card>
      ),
      disabled: isNew,
    },
    {
      key: 'order',
      label: 'Karar/Buýruk',
      children: (
        <Card>
          <BuildingOrder building={building!} />
        </Card>
      ),
      disabled: isNew,
    },
    {
      key: 'cert',
      label: 'Döwletnama/Kepilnama',
      children: (
        <Card>
          <BuildingCert building={building!} />
        </Card>
      ),
      disabled: isNew,
    },
    {
      key: 'square',
      label: 'Meýdan',
      children: (
        <Card>
          <BuildingSquare building={building!} />
        </Card>
      ),
      disabled: isNew,
    },
  ];

  return (
    <Flex vertical gap={16}>
      <BuildingsBreadcrumb withLeftArrow withId />
      <Tabs
        defaultActiveKey={searchParams.get('tab') || 'address'}
        items={items}
        onChange={onChange}
      />
    </Flex>
  );
}
