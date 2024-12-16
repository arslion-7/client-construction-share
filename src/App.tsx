import React from 'react';
import { ConfigProvider, Layout } from 'antd';
import './App.css';
import AppSider from './components/AppSider';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import AppContent from './components/AppContent';

const theme = {
  token: {
    // Seed Token
    colorPrimary: '#B54629', // Brick-like orange
    borderRadius: 4, // Slightly rounded corners

    // Alias Tokens (optional for customization)
    colorBgContainer: '#FFEFE6', // Light orange background for containers
    colorText: '#000', // Black text color for better readability
    colorLink: '#B54629', // Brick-like orange links
    colorLinkHover: '#7A301C' // Darker brick-like orange for hover effect
  }
};

const App: React.FC = () => {
  return (
    <ConfigProvider theme={theme}>
      <Layout style={{ minHeight: '100vh' }}>
        <AppSider />
        <Layout>
          <AppHeader />
          <AppContent />
          <AppFooter />
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
