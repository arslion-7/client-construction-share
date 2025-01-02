import { Form, Input, InputNumber } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import SubmitButton from '../button/SubmitButton';
import { IOrg } from '@/features/generalTypes';
import { useFocusInput } from './hooks';

interface IFormOrgContent {
  org: IOrg;
  onFinish: (values: IOrg) => Promise<void>;
  loading: boolean;
}

const FormOrgContent = ({ org, onFinish, loading }: IFormOrgContent) => {
  const [form] = Form.useForm<IOrg>();

  const focusInput = useFocusInput();

  return (
    <Form
      form={form}
      initialValues={org}
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
    >
      <Form.Item name='t_b' label='t_b'>
        <InputNumber ref={focusInput} />
      </Form.Item>
      <Form.Item name='org_name' label='org_name'>
        <TextArea rows={2} />
      </Form.Item>
      <Form.Item name='head_position' label='head_position'>
        <Input />
      </Form.Item>
      <Form.Item name='head_full_name' label='head_full_name'>
        <Input />
      </Form.Item>
      <Form.Item name='org_additional_info' label='Goşmaça maglumat'>
        <TextArea rows={2} placeholder='additional_info' />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 21, span: 3 }}>
        <SubmitButton
          loading={loading} // loading={isLoadingCreate || isLoadingUpdate}
        />
      </Form.Item>
    </Form>
  );
};

export default FormOrgContent;
