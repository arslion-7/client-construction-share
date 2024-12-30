import { useFocusInput } from '@/components/common/hooks';
import SubmitButton from '@/components/SubmitButton';
import { useUpdateRegistryNumberMutation } from '@/features/registries/registriesApiSlice';
import { IRegistry } from '@/features/registries/types';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useMessageApi } from '@/utils/messages';
import { Form, InputNumber } from 'antd';

export default function RegistryNumberForm({
  registry
}: {
  registry: IRegistry;
}) {
  const { id } = useIsNew();
  const { messageApi } = useMessageApi();
  const focusInput = useFocusInput();

  const [form] = Form.useForm<{ t_b: number }>();

  const [updateRegistryNumber, { isLoading }] =
    useUpdateRegistryNumberMutation();

  const onFinish = async (values: { t_b: number }) => {
    try {
      await updateRegistryNumber({ id: id!, t_b: values.t_b });
      messageApi.success('Hasaba alyş belgisi täzelendi');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Form
      form={form}
      name='registry_update_registry_number_form'
      layout='inline'
      initialValues={{ t_b: registry.t_b }}
      onFinish={onFinish}
      labelCol={{ span: 18 }}
      wrapperCol={{ span: 6 }}
    >
      <Form.Item name='t_b' label='Hasaba alyş belgisi'>
        <InputNumber ref={focusInput} style={{ width: 150 }} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 21, span: 3 }}>
        <SubmitButton
          loading={isLoading} // loading={isLoadingCreate || isLoadingUpdate}
          size='middle'
        />
      </Form.Item>
    </Form>
  );
}
