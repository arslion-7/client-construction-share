import { Card, Flex, Skeleton, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import {
  HomeOutlined,
  MailOutlined,
  SettingOutlined,
  FileTextOutlined,
  BankOutlined,
} from '@ant-design/icons';

import { useIsNew } from '@/utils/hooks/paramsHooks';
import RegistriesBreadcrumb from '../registries/RegistriesBreadcrumb';
import { useSearchParams } from 'react-router';

import { useGetRegistryQuery } from '@/features/registries/registriesApiSlice';
import RegistryChoices from './RegistryChoices';
// import AddNewRegistry from './AddNewRegistry';
import RegistryMain from './RegistryMain';
import ShareholderProperty from './shareholderProperty/ShareholderProperty';
import RegistryMail from './RegistryMail';
import Contract from './contract/Contract';
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
      label: (
        <span>
          <HomeOutlined style={{ marginRight: 8 }} />
          Esasy
        </span>
      ),
      children: <Card>{<RegistryMain registry={registry!} />}</Card>,
    },
    {
      key: 'mail',
      label: (
        <span>
          <MailOutlined style={{ marginRight: 8 }} />
          Hat
        </span>
      ),
      children: <Card>{<RegistryMail registry={registry!} />}</Card>,
    },
    {
      key: 'choices',
      label: (
        <span>
          <SettingOutlined style={{ marginRight: 8 }} />
          Saýlamalylar
        </span>
      ),
      children: (
        <Card>{!isNew && <RegistryChoices registry={registry!} />}</Card>
      ),
      disabled: isNew,
    },
    {
      key: 'shareholder_property',
      label: (
        <span>
          <BankOutlined style={{ marginRight: 8 }} />
          Emläk paýçy
        </span>
      ),
      children: <Card>{!isNew && <ShareholderProperty />}</Card>,
      disabled: isNew,
    },
    {
      key: 'contract',
      label: (
        <span>
          <FileTextOutlined style={{ marginRight: 8 }} />
          Şertnama
        </span>
      ),
      children: <Card>{!isNew && <Contract registry={registry!} />}</Card>,
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
