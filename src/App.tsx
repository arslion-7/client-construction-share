import React from 'react';
import { Layout } from 'antd';
import './App.css';
import AppSider from './components/AppSider';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import AppContent from './components/AppContent';

const App: React.FC = () => {
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
};

export default App;
