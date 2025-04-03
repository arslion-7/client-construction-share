import { Card, Flex, Skeleton, Tabs } from 'antd';
import type { TabsProps } from 'antd';

import { useIsNew } from '@/utils/hooks/paramsHooks';
import RegistriesBreadcrumb from '../registries/RegistriesBreadcrumb';
import { useSearchParams } from 'react-router';

import { useGetRegistryQuery } from '@/features/registries/registriesApiSlice';
import RegistryChoices from './RegistryChoices';
// import AddNewRegistry from './AddNewRegistry';
import RegistryMain from './RegistryMain';
import ShareholderProperty from './shareholderProperty/ShareholderProperty';
import RegistryMail from './RegistryMail';
// import RegistryDatesForm from './dates/RegistryDatesForm';

export default function Registry() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { isNew, id } = useIsNew();

  console.log('isNew', isNew);

  const { data: registry, isLoading } = useGetRegistryQuery(id!, {
    skip: isNew,
  });

  if (isLoading) return <Skeleton />;

  const onChange = (key: string) => {
    searchParams.set('tab', key);
    setSearchParams(searchParams);
  };

  const items: TabsProps['items'] = [
    {
      key: 'main',
      label: 'Esasy',
      children: <Card>{<RegistryMain registry={registry!} />}</Card>,
    },
    {
      key: 'mail',
      label: 'Hat',
      children: <Card>{<RegistryMail registry={registry!} />}</Card>,
    },
    {
      key: 'choices',
      label: 'Saýlamalylar',
      children: (
        <Card>{!isNew && <RegistryChoices registry={registry!} />}</Card>
      ),
      disabled: isNew,
    },
    {
      key: 'shareholder_property',
      label: 'Emläk paýçy',
      children: <Card>{!isNew && <ShareholderProperty />}</Card>,
      disabled: isNew,
    },
    // {
    //   key: 'old',
    //   label: 'Öňki',
    //   children: <Card></Card>,
    //   disabled: isNew
    // }
  ];

  return (
    <>
      <Flex vertical gap={16}>
        <RegistriesBreadcrumb withLeftArrow withId />
        {/* {isNew ? (
          <AddNewRegistry />
        ) : ( */}
        <Flex vertical gap={12}>
          {/* <Card>
              <RegistryMain registry={registry!} />
            </Card> */}
          {/* <Card>
              <RegistryDatesForm registry={registry!} />
            </Card> */}
          <Tabs
            defaultActiveKey={searchParams.get('tab') || 'main'}
            items={items}
            onChange={onChange}
          />
        </Flex>
        {/* )} */}
      </Flex>
    </>
  );
}
