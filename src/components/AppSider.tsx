import { Layout, Menu, MenuProps } from 'antd';
import { Link } from 'react-router-dom';

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
        <Menu.Item key='1'>
          <Link to='/'>Home</Link>
        </Menu.Item>
        <Menu.Item key='2'>
          <Link to='/about'>About</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
