import { useFocusInput } from '@/components/common/hooks';
import SubmitButton from '@/components/button/SubmitButton';
import {
  useCreateRegistryMutation,
  useUpdateRegistryMutation,
} from '@/features/registries/registriesApiSlice';
import { IRegistry, IRegistryDates } from '@/features/registries/types';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useMessageApi } from '@/utils/messages';
import { DatePicker, Form, InputNumber } from 'antd';
import { dateFormat } from '@/utils/formats';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';

export default function RegistryMain({ registry }: { registry: IRegistry }) {
  const { isNew, id } = useIsNew();
  const { messageApi } = useMessageApi();
  const navigate = useNavigate();
  const focusInput = useFocusInput();

  const [form] = Form.useForm<{ t_b: number }>();

  const [createRegistry, { isLoading: isLoadingCreate }] =
    useCreateRegistryMutation();

  const [updateRegistry, { isLoading: isLoadingUpdate }] =
    useUpdateRegistryMutation();

  const onFinish = async (values: { t_b: number } & IRegistryDates) => {
    console.log('values', values);
    if (isNew) {
      try {
        const createdRegistry = await createRegistry(values).unwrap();
        navigate(`/registries/${createdRegistry.id}`);
        messageApi.success('Reýestr ýazgysy täze goşuldy');
      } catch (error) {
        console.log('error', error);
        messageApi.success(
          'Reýestr ýazgysy täze goşulanda ýalňyşlyk ýüze çykdy'
        );
      }
    } else {
      try {
        await updateRegistry({ id: id!, ...values });
        messageApi.success('Reýestr ýazgysy täzelendi');
      } catch (error) {
        console.log('error', error);
        messageApi.error('Reýestr ýazgysy täzelenende ýalňyşlyk ýüze çykdy');
      }
    }
  };

  return (
    <Form
      form={form}
      name='registry_update_registry_number_form'
      // layout='inline'
      initialValues={
        registry && {
          t_b: registry.t_b,
          reviewed_at: registry.reviewed_at && dayjs(registry.reviewed_at),
          registered_at:
            registry.registered_at && dayjs(registry.registered_at),
        }
      }
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
    >
      <Form.Item<{ t_b: number } & IRegistryDates>
        name='t_b'
        label='Hasaba alyş belgisi'
      >
        <InputNumber ref={focusInput} style={{ width: 150 }} />
      </Form.Item>
      <Form.Item<{ t_b: number } & IRegistryDates>
        label='Seredilen senesi'
        name='reviewed_at'
        hasFeedback
      >
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item<{ t_b: number } & IRegistryDates>
        label='Hasaba alnan senesi'
        name='registered_at'
        hasFeedback
      >
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 21, span: 3 }}>
        <SubmitButton
          loading={isLoadingCreate || isLoadingUpdate}
          size='middle'
        />
      </Form.Item>
    </Form>
  );
}
