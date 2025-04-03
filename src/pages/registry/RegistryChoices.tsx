import { Avatar, Button, List } from 'antd';
import { IRegistry } from '@/features/registries/types';
import {
  BarsOutlined,
  GroupOutlined,
  HddOutlined,
  HomeOutlined,
  PieChartOutlined,
  ReloadOutlined,
  SelectOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { PATHS } from '@/routes/paths';

interface IRegistryChoicesProps {
  registry: IRegistry;
}

export default function RegistryChoices({ registry }: IRegistryChoicesProps) {
  const navigate = useNavigate();

  const data = [
    {
      title: 'Baş potratçy',
      url: PATHS.GENERAL_CONTRACTORS,
      icon: <GroupOutlined />,
      description: registry.general_contractor
        ? registry.general_contractor.org_name
        : '?',
      selected: registry.general_contractor_id ? true : false,
    },

    {
      title: 'Desga',
      url: PATHS.BUILDINGS,
      icon: <HomeOutlined />,
      selected: registry.building ? true : false,
      description: registry.building ? registry.building.ident_number : '?',
    },
    {
      title: 'Gurujy',
      url: PATHS.BUILDERS,
      icon: <BarsOutlined />,
      selected: registry.builder ? true : false,
      description: registry.builder ? registry.builder.org_name : '?',
    },
    {
      title: 'Kömekçi potratçy (entak ishlanok)',
      icon: <HddOutlined />,
      url: PATHS.SUB_CONTRACTORS,
      // description: registry.sub_contractor
      //   ? registry.sub_contractor.org_name
      //   : '?',
    },
    {
      title: 'Almaga gelen',
      url: PATHS.RECEIVERS,
      icon: <UserOutlined />,
      selected: registry.receiver ? true : false,
      description: registry.receiver ? registry.receiver.org_name : '?',
    },
    {
      title: 'Paýçy',
      url: PATHS.SHAREHOLDERS,
      icon: <PieChartOutlined />,
      selected: registry.shareholder ? true : false,
      description: registry.shareholder ? registry.shareholder.id : '?',
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
              onClick={() => navigate(`${url}?registryId=${registry.id}`)}
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
