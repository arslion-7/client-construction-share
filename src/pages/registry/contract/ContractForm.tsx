import SubmitButton from '@/components/button/SubmitButton';
import { useUpdateRegistryContractMutation } from '@/features/registries/registriesApiSlice';
import { IContract } from '@/features/registries/types';
import { dateFormat } from '@/utils/formats';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useMessageApi } from '@/utils/messages';
import { rules } from '@/utils/rules';
import { DatePicker, Divider, Form, Input } from 'antd';
import dayjs from 'dayjs';

export default function ContractForm({ contract }: { contract: IContract }) {
  const { id } = useIsNew();
  const { messageApi } = useMessageApi();
  const [form] = Form.useForm<IContract>();

  const [updateRegistryContract, { isLoading }] =
    useUpdateRegistryContractMutation();

  const onFinish = async (values: IContract) => {
    try {
      await updateRegistryContract({ id: id!, ...values });
      messageApi.success('Contract updated successfully');
    } catch (error) {
      console.log('error', error);
      messageApi.error('Something went wrong ');
    }
  };

  return (
    <Form
      form={form}
      initialValues={{
        ...contract,
        builder_shareholder_date:
          contract.builder_shareholder_date &&
          dayjs(contract.builder_shareholder_date),
        builder_contractor_date:
          contract.builder_contractor_date &&
          dayjs(contract.builder_contractor_date),
      }}
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 24 }}
    >
      <Form.Item<IContract>
        label='Gurujy paýçy belgisi'
        name='builder_shareholder_number'
        hasFeedback
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Gurujy paýçy senesi'
        name='builder_shareholder_date'
        rules={[rules.non_required()]}
        hasFeedback
      >
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item
        name='builder_shareholder_additional_info'
        label='Goşmaça maglumat'
      >
        <Input.TextArea />
      </Form.Item>
      <Divider />
      <Form.Item<IContract>
        label='Gurujy potratçy belgisi'
        name='builder_contractor_number'
        hasFeedback
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Gurujy potratçy senesi'
        name='builder_contractor_date'
        rules={[rules.non_required()]}
        hasFeedback
      >
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item
        name='builder_contractor_additional_info'
        label='Goşmaça maglumat'
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 21, span: 3 }}>
        <SubmitButton loading={isLoading} size='middle' />
      </Form.Item>
    </Form>
  );
}
