import React from 'react';
import MainLayout from './layouts/MainLayout';
import { message } from 'antd';
import { MessageContext } from './utils/messages';

const App: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <MessageContext.Provider value={messageApi}>
      {contextHolder}
      <MainLayout />
    </MessageContext.Provider>
  );
};

export default App;
