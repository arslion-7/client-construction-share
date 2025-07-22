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
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { lightTheme, darkTheme } from './utils/themes';

import 'dayjs/locale/tk';

// Component to apply theme to ConfigProvider
function ThemedApp() {
  const { theme } = useTheme();

  return (
    <ConfigProvider
      locale={tkTK}
      theme={theme === 'light' ? lightTheme : darkTheme}
    >
      <AppRoutes />
    </ConfigProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider>
          <ThemedApp />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
