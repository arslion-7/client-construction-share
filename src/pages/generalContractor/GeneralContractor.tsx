import { useIsNew } from '@/utils/hooks/paramsHooks';
import { Card, Flex, Skeleton } from 'antd';
import GeneralContractorsBreadcrumb from '../generalContractors/GeneralContractorsBreadcrumb';
import CertContent from '@/components/common/CertContent';
import ResolutionContent from '@/components/common/ResolutionContent';
import { useGetGeneralContractorQuery } from '@/features/generalContractors/generalContractorsApiSlice';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useSearchParams } from 'react-router';
import GeneralContractorOrg from './GeneralContractorOrg';

export default function GeneralContractor() {
  const { idTk, isNew, id } = useIsNew();
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
      children: <CertContent />,
      disabled: isNew,
    },
    {
      key: 'resolution',
      label: 'Rugsatnama maglumaty',
      children: <ResolutionContent />,
      disabled: isNew,
    },
  ];

  return (
    <Flex vertical gap={16}>
      <GeneralContractorsBreadcrumb
        withLeftArrow
        items={[{ title: idTk!, href: '' }]}
      />
      <Tabs
        defaultActiveKey={searchParams.get('tab') || 'org'}
        items={items}
        onChange={onChange}
      />
    </Flex>
  );
}
