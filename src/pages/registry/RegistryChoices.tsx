import { Avatar, Button, List } from 'antd';
import { IRegistry } from '@/features/registries/types';
import {
  BarsOutlined,
  EyeOutlined,
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
import { useTheme } from '@/contexts/ThemeContext';

interface IRegistryChoicesProps {
  registry: IRegistry;
}

export default function RegistryChoices({ registry }: IRegistryChoicesProps) {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const data = [
    {
      title: 'Baş potratçy',
      url: PATHS.GENERAL_CONTRACTORS,
      icon: <GroupOutlined />,
      description: registry.general_contractor
        ? registry.general_contractor.org_name
        : '?',
      selected: registry.general_contractor_id ? true : false,
      detailUrl: registry.general_contractor_id
        ? `${PATHS.GENERAL_CONTRACTORS}/${registry.general_contractor_id}`
        : null,
    },

    {
      title: 'Desga',
      url: PATHS.BUILDINGS,
      icon: <HomeOutlined />,
      selected: registry.building ? true : false,
      description: registry.building ? registry.building.ident_number : '?',
      detailUrl: registry.building_id
        ? `${PATHS.BUILDINGS}/${registry.building_id}`
        : null,
    },
    {
      title: 'Gurujy',
      url: PATHS.BUILDERS,
      icon: <BarsOutlined />,
      selected: registry.builder ? true : false,
      description: registry.builder ? registry.builder.org_name : '?',
      detailUrl: registry.builder_id
        ? `${PATHS.BUILDERS}/${registry.builder_id}`
        : null,
    },
    {
      title: 'Kömekçi potratçy (entak ishlanok)',
      icon: <HddOutlined />,
      url: PATHS.SUB_CONTRACTORS,
      // description: registry.sub_contractor
      //   ? registry.sub_contractor.org_name
      //   : '?',
      selected: false,
      detailUrl: null,
    },
    {
      title: 'Almaga gelen',
      url: PATHS.RECEIVERS,
      icon: <UserOutlined />,
      selected: registry.receiver ? true : false,
      description: registry.receiver ? registry.receiver.org_name : '?',
      detailUrl: registry.receiver_id
        ? `${PATHS.RECEIVERS}/${registry.receiver_id}`
        : null,
    },
    {
      title: 'Paýçy',
      url: PATHS.SHAREHOLDERS,
      icon: <PieChartOutlined />,
      selected: registry.shareholder ? true : false,
      description: registry.shareholder
        ? `${registry.shareholder.id}${
            registry.shareholder.org_name
              ? ` - ${registry.shareholder.org_name}`
              : ''
          }`
        : '?',
      detailUrl: registry.shareholder_id
        ? `${PATHS.SHAREHOLDERS}/${registry.shareholder_id}`
        : null,
    },
  ];

  return (
    <List
      itemLayout='horizontal'
      dataSource={data}
      renderItem={({ icon, title, description, url, selected, detailUrl }) => (
        <List.Item
          actions={[
            <Button
              onClick={() => navigate(`${url}?registryId=${registry.id}`)}
              type={selected ? 'primary' : 'default'}
              icon={selected ? <SelectOutlined /> : <ReloadOutlined />}
            >
              "{title}" {selected ? 'täzele' : 'saýla'}
            </Button>,
            // Add detail view button only if the object exists and has a detail URL
            ...(selected && detailUrl
              ? [
                  <Button
                    key='detail'
                    onClick={() => navigate(detailUrl)}
                    type='default'
                    icon={<EyeOutlined />}
                  >
                    Görkez
                  </Button>,
                ]
              : []),
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
            description={
              <span
                style={{
                  color: theme === 'light' ? '#595959' : '#a6a6a6',
                  fontSize: '14px',
                }}
              >
                {description}
              </span>
            }
          />
        </List.Item>
      )}
    />
  );
}
