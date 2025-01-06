import { Avatar, Button, List } from 'antd';
import { IRegistry } from '@/features/registries/types';
import {
  BarsOutlined,
  GroupOutlined,
  HddOutlined,
  HomeOutlined,
  ReloadOutlined,
  SelectOutlined
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
      url: PATHS.GENERAL_CONTRACTORS,
      icon: <GroupOutlined />,
      description: registry.general_contractor
        ? registry.general_contractor.org_name
        : '?',
      selected: registry.general_contractor_id ? true : false
    },
    {
      title: 'Kömekçi potratçy',
      icon: <HddOutlined />,
      url: PATHS.SUB_CONTRACTORS
      // description: registry.sub_contractor
      //   ? registry.sub_contractor.org_name
      //   : '?',
    },
    {
      title: 'Desga',
      url: PATHS.BUILDINGS,
      icon: <HomeOutlined />,
      selected: registry.building ? true : false,
      description: registry.building ? registry.building.ident_number : '?'
    },
    {
      title: 'Gurujy',
      url: PATHS.BUILDERS,
      icon: <BarsOutlined />,
      selected: registry.builder ? true : false,
      description: registry.builder ? registry.builder.org_name : '?'
    }
  ];

  return (
    <List
      itemLayout='horizontal'
      dataSource={data}
      renderItem={({ icon, title, description, url, selected }, _) => (
        <List.Item
          actions={[
            <Button
              onClick={() => navigate(`${url}?registryId=${registry.id}`)}
              type={selected ? 'primary' : 'default'}
              icon={selected ? <SelectOutlined /> : <ReloadOutlined />}
            >
              "{title}" {selected ? 'täzele' : 'saýla'}
            </Button>
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
