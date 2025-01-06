import { Cascader, Input, Skeleton } from 'antd';

import { useGetAreaHierarchyQuery } from '@/features/areas/areasApiSlice';
import { CascaderOption } from '@/utils/responseUtils';
import { Form } from 'antd';

import SubmitButton from '@/components/button/SubmitButton';

import type { CascaderProps, GetProp } from 'antd';

type DefaultOptionType = GetProp<CascaderProps, 'options'>[number];

export interface IAreaAddressForm {
  areas: number[];
  address: string;
  address_additional_info: string;
}

interface AreaFormProps {
  initialValues: IAreaAddressForm;
  onFinish: (values: IAreaAddressForm) => void;
  isSubmitLoading: boolean;
}

export default function AreaForm({
  initialValues,
  onFinish,
  isSubmitLoading
}: AreaFormProps) {
  const { data: areas, isLoading: isLoadingAreas } = useGetAreaHierarchyQuery();

  const [form] = Form.useForm<IAreaAddressForm>();

  if (isLoadingAreas) return <Skeleton />;

  const onChange: CascaderProps<CascaderOption>['onChange'] = (value) => {
    console.log(value);
  };

  const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
      (option) =>
        (option.label as string)
          .toLowerCase()
          .indexOf(inputValue.toLowerCase()) > -1
    );

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
    >
      <Form.Item name='areas' label='Ýerleşýän ýeri'>
        <Cascader
          loading={isLoadingAreas}
          style={{ width: 500 }}
          options={areas?.options}
          onChange={onChange}
          showSearch={{ filter }}
          placeholder='Ýeri sayla'
          onSearch={(value) => console.log(value)}
        />
      </Form.Item>
      <Form.Item name='address' label='Address'>
        <Input />
      </Form.Item>
      <Form.Item
        name='address_additional_info'
        label='Address goşmaça maglumaty'
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 21, span: 3 }}>
        <SubmitButton loading={isSubmitLoading} size='middle' />
      </Form.Item>
    </Form>
  );
}
