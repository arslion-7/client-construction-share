import { Avatar, Button, List } from 'antd';
import { IRegistry } from '@/features/registries/types';
import {
  BarsOutlined,
  GroupOutlined,
  HddOutlined,
  HomeOutlined,
  InboxOutlined,
  ReloadOutlined,
  SelectOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { PATHS } from '@/routes/paths';

interface IRegistryMainProps {
  registry: IRegistry;
}

export default function RegistryMain({ registry }: IRegistryMainProps) {
  const navigate = useNavigate();

  const data = [
    {
      title: 'Baş potratçy',
      icon: <GroupOutlined />,
      description: registry.general_contractor
        ? registry.general_contractor.org_name
        : '?',
      selected: registry.general_contractor_id ? true : false,
      url: PATHS.GENERAL_CONTRACTORS,
    },
    {
      title: 'Kömekçi potratçy',
      icon: <HddOutlined />,
      // description: registry.sub_contractor
      //   ? registry.sub_contractor.org_name
      //   : '?',
      url: PATHS.SUB_CONTRACTORS,
    },
    {
      title: 'Desga',
      icon: <HomeOutlined />,
      url: PATHS.BUILDINGS,
    },
    {
      title: 'Ant Design Title 4',
      icon: <BarsOutlined />,
      url: 'bbb',
    },
  ];

  return (
    <List
      itemLayout='horizontal'
      dataSource={data}
      renderItem={({ icon, title, description, url, selected }, _) => (
        <List.Item
          actions={[
            <Button
              onClick={() => navigate(`/${url}?registryId=${registry.id}`)}
              type={selected ? 'primary' : 'default'}
              icon={selected ? <SelectOutlined /> : <ReloadOutlined />}
            >
              "{title}" {selected ? 'täzele' : 'saýla'}
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={
              <Avatar
                icon={icon}
                style={{ color: selected ? 'green' : 'gray' }}
              />
            }
            title={<a href='https://ant.design'>{title}</a>}
            description={description}
          />
        </List.Item>
      )}
    />
  );
}
