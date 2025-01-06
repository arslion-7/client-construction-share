import {
  BarsOutlined,
  GroupOutlined,
  HddOutlined,
  HomeOutlined,
  InboxOutlined,
  LoginOutlined,
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
import { PATHS } from '@/routes/paths';

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
          key: PATHS.REGISTRIES
        },
        {
          label: 'Baş potratçylar',
          icon: <GroupOutlined />,
          key: PATHS.GENERAL_CONTRACTORS
        },
        {
          label: 'Kömekçi potratçylar',
          icon: <HddOutlined />,
          key: '/'
        },
        {
          label: 'Desgalar',
          icon: <HomeOutlined />,
          key: PATHS.BUILDINGS
        },
        {
          label: 'Gurujylar',
          icon: <BarsOutlined />,
          key: PATHS.BUILDERS
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
          key: PATHS.USERS,
          icon: <TeamOutlined />
        },
        {
          label: 'Ulgama gir',
          key: PATHS.SIGNIN,
          icon: <LoginOutlined />
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
