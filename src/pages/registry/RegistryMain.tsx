import { Avatar, List } from 'antd';
import { IRegistry } from '@/features/registries/types';
import {
  BarsOutlined,
  GroupOutlined,
  HddOutlined,
  InboxOutlined,
} from '@ant-design/icons';

interface IRegistryMainProps {
  registry: IRegistry;
}

const data = [
  {
    title: 'Baş potratçy',
    icon: <GroupOutlined />,
  },
  {
    title: 'Kömekçi potratçy',
    icon: <HddOutlined />,
  },
  {
    title: 'Ant Design Title 3',
    icon: <InboxOutlined />,
  },
  {
    title: 'Ant Design Title 4',
    icon: <BarsOutlined />,
  },
];

export default function RegistryMain({ registry }: IRegistryMainProps) {
  return (
    <List
      itemLayout='horizontal'
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon={item.icon} />}
            title={<a href='https://ant.design'>{item.title}</a>}
            description='Ant Design, a design language for background applications, is refined by Ant UED Team'
          />
        </List.Item>
      )}
    />
  );
}
