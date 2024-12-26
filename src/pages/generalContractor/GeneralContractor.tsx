import { useIsNew } from '@/utils/hooks/paramsHooks';
import { Card, Flex, Skeleton } from 'antd';
import GeneralContractorsBreadcrumb from '../generalContractors/GeneralContractorsBreadcrumb';
import { useGetGeneralContractorQuery } from '@/features/generalContractors/generalContractorsApiSlice';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useSearchParams } from 'react-router';
import GeneralContractorOrg from './GeneralContractorOrg';
import GeneralContractorCert from './GeneralContractorCert';
import GeneralContractorResolution from './GeneralContractorResolution';

export default function GeneralContractor() {
  const { isNew, id } = useIsNew();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: generalContractor, isLoading: isLoadingGeneralContractor } =
    useGetGeneralContractorQuery(id!, { skip: isNew });

  if (isLoadingGeneralContractor) return <Skeleton />;

  const onChange = (key: string) => {
    searchParams.set('tab', key);
    setSearchParams(searchParams);
  };

  const items: TabsProps['items'] = [
    {
      key: 'org',
      label: 'Kärhana maglumaty',
      children: (
        <Card>
          <GeneralContractorOrg generalContractor={generalContractor!} />
        </Card>
      ),
    },
    {
      key: 'cert',
      label: 'Şahadatnama maglumaty',
      children: (
        <Card>
          <GeneralContractorCert generalContractor={generalContractor!} />
        </Card>
      ),
      disabled: isNew,
    },
    {
      key: 'resolution',
      label: 'Rugsatnama maglumaty',
      children: (
        <Card>
          <GeneralContractorResolution generalContractor={generalContractor!} />
        </Card>
      ),
      disabled: isNew,
    },
  ];

  return (
    <Flex vertical gap={16}>
      <GeneralContractorsBreadcrumb withLeftArrow withId />
      <Tabs
        defaultActiveKey={searchParams.get('tab') || 'org'}
        items={items}
        onChange={onChange}
      />
    </Flex>
  );
}
