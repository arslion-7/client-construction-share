import { OrderedListOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps } from 'antd';
import { Link } from 'react-router';

const { Sider } = Layout;

export default function AppSider() {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
    <Sider>
      <div className='logo' />
      <Menu
        theme='dark'
        onClick={onClick}
        mode='inline'
        defaultSelectedKeys={['1']}
      >
        <Menu.Item key='1' icon={<OrderedListOutlined />}>
          <Link to='/registries'>Paýly reýestr</Link>
        </Menu.Item>
        <Menu.Item key='2'>
          <Link to='/about'>About</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
