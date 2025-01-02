import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';
import AppRoutes from './routes/routes.tsx';
import { BrowserRouter } from 'react-router';
import { ConfigProvider } from 'antd';
import tkTK from 'antd/locale/tk_TK';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';

import 'dayjs/locale/tk';

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
      <ConfigProvider locale={tkTK}>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
);
