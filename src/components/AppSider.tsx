import {
  BarsOutlined,
  GroupOutlined,
  HddOutlined,
  InboxOutlined,
  PieChartOutlined,
  SettingOutlined,
  TableOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { Image, Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const { Sider } = Layout;

import imgUrl from '@/assets/construction-share-small.webp';

export default function AppSider() {
  const navigate = useNavigate();

  const [selectedKeys, setSelectedKeys] = useState('/');

  useEffect(() => {
    const pathName = location.pathname;
    console.log('pathName', pathName);
    setSelectedKeys(location.pathname);
  }, [location.pathname]);

  const items = [
    {
      label: 'Paýly',
      icon: <PieChartOutlined />,
      key: 'share',
      children: [
        {
          label: 'Reýestr',
          icon: <TableOutlined />,
          key: '/registries'
        },
        {
          label: 'Baş potratçylar',
          icon: <GroupOutlined />,
          key: '/general_contractors'
        },
        {
          label: 'Kömekçi potratçylar',
          icon: <HddOutlined />,
          key: '/'
        },
        {
          label: 'Baş potratçylar',
          icon: <InboxOutlined />,
          key: '/about2'
        },
        {
          label: 'Baş potratçylar',
          icon: <BarsOutlined />,
          key: '/about3'
        }
      ]
    },
    {
      label: 'Sazlamalar',
      icon: <SettingOutlined />,
      key: 'settings',
      children: [
        {
          label: 'Ulanyjylar',
          key: '/users',
          icon: <TeamOutlined />
        }
      ]
    }
  ];

  return (
    <Sider>
      <div className='logo-container'>
        {/* New wrapper div */}
        <Image className='logo' width={40} src={imgUrl} />
      </div>
      <Menu
        theme='dark'
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        mode='inline'
        // defaultSelectedKeys={[]}
        selectedKeys={[selectedKeys]}
        defaultOpenKeys={['share', 'settings']}
        items={items}
      />
      {/* <Menu.Item key='1' icon={<OrderedListOutlined />}>
          <Link to='/registries'>Paýly reýestr</Link>
        </Menu.Item>
        <Menu.Item key='2'>
          <Link to='/about'>About</Link>
        </Menu.Item>
      </Menu> */}
    </Sider>
  );
}
