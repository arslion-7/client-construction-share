import {
  useCreateReceiverMutation,
  useUpdateReceiverOrgMutation,
} from '@/features/receivers/receiversApiSlice';
import { IReceiver } from '@/features/receivers/types';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useMessageApi } from '@/utils/messages';
import { Form } from 'antd';
import { useNavigate } from 'react-router';

export default function ReceiverMain({ receiver }: { receiver: IReceiver }) {
  const { id, isNew } = useIsNew();
  const { messageApi } = useMessageApi();
  const navigate = useNavigate();

  const [form] = Form.useForm<IReceiver>();

  const [create, { isLoading: isLoadingCreate }] = useCreateReceiverMutation();

  const [update, { isLoading: isLoadingUpdate }] =
    useUpdateReceiverOrgMutation();

  const onFinish = async (values: IReceiver) => {
    if (!isNew) {
      try {
        await update({ id: id!, receiver: { ...values } });
        messageApi.success('Almaga gelen täzelendi');
      } catch (error) {
        console.log('error', error);
      }
    }

    try {
      const createdReceiver = await create({ ...values }).unwrap();
      navigate(`/receivers/${createdReceiver.id}`);
      messageApi.success('Täze almaga gelen goşuldy');
    } catch (error) {
      console.log('error', error);
    }
  };

  return <div>ReceiverMain</div>;
}
