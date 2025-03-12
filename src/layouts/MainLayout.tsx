import { Layout } from 'antd';
import AppHeader from '../components/AppHeader';
import AppContent from '../components/AppContent';
import AppFooter from '../components/AppFooter';
import AppSider from '../components/AppSider';

export default function MainLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppSider />
      <Layout>
        <AppHeader />
        <AppContent />
        <AppFooter />
      </Layout>
    </Layout>
  );
}
