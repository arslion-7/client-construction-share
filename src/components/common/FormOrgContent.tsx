import { Form, Input, InputNumber, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import SubmitButton from '../button/SubmitButton';
import { IOrg } from '@/features/generalTypes';
import { useFocusInput } from './hooks';
import { orgTypeOptions } from '@/utils/commonOptions';
import { useEffect, useState } from 'react';

interface IFormOrgContent {
  org: IOrg;
  onFinish: (values: IOrg) => Promise<void>;
  loading: boolean;
}

const FormOrgContent = ({ org, onFinish, loading }: IFormOrgContent) => {
  const [form] = Form.useForm<IOrg>();

  const defaultOrgNameLabel = 'Guramanyň ady';

  const [orgNameLabel, setOrgNameLabel] = useState(defaultOrgNameLabel);

  const focusInput = useFocusInput();

  const orgType = Form.useWatch('org_type', form);

  useEffect(() => {
    if (orgType === 'Raýat') {
      setOrgNameLabel('Raýat A.F.Aa');
    } else {
      setOrgNameLabel(defaultOrgNameLabel);
    }
  }, [orgType]);

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
      <Form.Item name='org_type' label='Gurama görnüşi'>
        <Select
          options={orgTypeOptions.map((orgType) => ({
            label: orgType,
            value: orgType,
          }))}
        />
      </Form.Item>
      <Form.Item name='org_name' label={orgNameLabel}>
        <TextArea rows={2} />
      </Form.Item>
      <Form.Item name='head_position' label='Ýolbaşçynyň wezipesi'>
        <Input />
      </Form.Item>
      <Form.Item name='head_full_name' label='Ýolbaşçynyň A.F.Aa'>
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
