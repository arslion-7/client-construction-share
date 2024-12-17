import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';
import AppRoutes from './routes.tsx';
import { BrowserRouter } from 'react-router';
import { ConfigProvider } from 'antd';

// const theme = {
//   token: {
//     // Seed Token
//     colorPrimary: '#B54629', // Brick-like orange
//     borderRadius: 4, // Slightly rounded corners
//     // Alias Tokens (optional for customization)
//     colorBgContainer: '#FFEFE6', // Light orange background for containers
//     colorText: '#000', // Black text color for better readability
//     colorLink: '#B54629', // Brick-like orange links
//     colorLinkHover: '#7A301C', // Darker brick-like orange for hover effect
//   },
// };

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider
      // theme={theme}
      >
        <AppRoutes />
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
);
