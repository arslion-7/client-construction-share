import { message } from 'antd';
import { createContext, useContext } from 'react';

type MessageApiType = ReturnType<typeof message.useMessage>[0];

export const MessageContext = createContext<MessageApiType | null>(null);

export function useMessageApi() {
  const messageApi = useContext(MessageContext);

  return { messageApi: messageApi! };
}
