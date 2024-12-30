import { Avatar, Button, List } from 'antd';
import { IRegistry } from '@/features/registries/types';
import {
  BarsOutlined,
  GroupOutlined,
  HddOutlined,
  InboxOutlined,
  ReloadOutlined,
  SelectOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router';

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
      url: 'general_contractors',
    },
    {
      title: 'Kömekçi potratçy',
      icon: <HddOutlined />,
      description: registry.sub_contractor
        ? registry.sub_contractor.org_name
        : '?',
      url: 'sub_contractors',
    },
    {
      title: 'Ant Design Title 3',
      icon: <InboxOutlined />,
      url: 'aaa',
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
      renderItem={({ icon, title, description, url, selected }, index) => (
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
