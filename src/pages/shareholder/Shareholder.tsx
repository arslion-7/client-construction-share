import { useIsNew } from '@/utils/hooks/paramsHooks';
import { Card, Flex, Skeleton } from 'antd';

import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useSearchParams } from 'react-router';
import ShareholdersBreadcrumb from '../shareholders/ShareholdersBreadcrumb';
import { useGetShareholderQuery } from '@/features/shareholders/shareholdersApiSlice';
import ShareholderAddress from './ShareholderAddress';
import ShareholderDocs from './ShareholderDocs';
import ShareholderOrg from './ShareholderOrg';
import ShareholderPhones from './ShareholderPhones';
// import ShareholderAddress from './ShareholderAddress';
// import ShareholderMain from './ShareholderMain';

export default function Shareholder() {
  const { isNew, id } = useIsNew();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: shareholder, isLoading: isLoadingShareholder } =
    useGetShareholderQuery(id!, { skip: isNew });

  if (isLoadingShareholder) return <Skeleton />;

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
          <ShareholderAddress shareholder={shareholder!} />
        </Card>
      ),
    },
    {
      key: 'org',
      label: 'Kärhana maglumaty',
      children: (
        <Card>
          <ShareholderOrg shareholder={shareholder!} />
        </Card>
      ),
    },
    {
      key: 'docs',
      label: 'Resminama maglumaty',
      children: (
        <Card>
          <ShareholderDocs shareholder={shareholder!} />
        </Card>
      ),
      disabled: isNew,
    },
    {
      key: 'phones',
      label: 'Telefon belgileri',
      children: (
        <Card>
          <ShareholderPhones shareholder={shareholder!} />
        </Card>
      ),
      disabled: isNew,
    },
  ];

  return (
    <Flex vertical gap={16}>
      <ShareholdersBreadcrumb withLeftArrow withId />
      <Tabs
        defaultActiveKey={searchParams.get('tab') || 'address'}
        items={items}
        onChange={onChange}
      />
    </Flex>
  );
}
