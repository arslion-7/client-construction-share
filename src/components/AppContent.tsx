import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

export default function AppContent() {
  return (
    <Content className='site-layout'>
      <Outlet />
    </Content>
  );
}
