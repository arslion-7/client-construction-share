import { Cascader, Input, Skeleton } from 'antd';

import { useGetAreaHierarchyQuery } from '@/features/areas/areasApiSlice';
import { CascaderOption } from '@/utils/responseUtils';
import { Form } from 'antd';

import SubmitButton from '@/components/button/SubmitButton';

import type { CascaderProps, GetProp } from 'antd';

type DefaultOptionType = GetProp<CascaderProps, 'options'>[number];

export interface IAreaStreetForm {
  areas: number[];
  street: string;
}

interface AreaFormProps {
  initialValues: IAreaStreetForm;
  onFinish: (values: IAreaStreetForm) => void;
  isSubmitLoading: boolean;
}

export default function AreaForm({
  initialValues,
  onFinish,
  isSubmitLoading
}: AreaFormProps) {
  const { data: areas, isLoading: isLoadingAreas } = useGetAreaHierarchyQuery();

  const [form] = Form.useForm<IAreaStreetForm>();

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
      <Form.Item name='street' label='Köçe/çatryk'>
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 21, span: 3 }}>
        <SubmitButton loading={isSubmitLoading} size='middle' />
      </Form.Item>
    </Form>
  );
}
