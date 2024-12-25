import { Form, Input, InputNumber } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import SubmitButton from '../SubmitButton';
import { IOrg } from '@/features/generalTypes';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useNavigate } from 'react-router';

interface IFormOrgContent {
  org: IOrg;
  onCreate: (org: IOrg) => Promise<void>;
  onUpdate: (org: IOrg) => Promise<void>;
  loading: boolean;
}

const FormOrgContent = ({
  org,
  onCreate,
  onUpdate,
  loading,
}: IFormOrgContent) => {
  const { isNew, id } = useIsNew();
  const navigate = useNavigate();

  const [form] = Form.useForm<IOrg>();

  const onFinish = async (values: IOrg) => {
    if (isNew) {
      const generalContractor = await onCreate(values).unwrap();
      navigate(`/general_contractors/${generalContractor.id}`);
    } else {
      await onUpdate(values);
    }
  };

  return (
    <Form
      form={form}
      initialValues={org}
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
    >
      <Form.Item name='t_b' label='t_b'>
        <InputNumber />
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
