import { Cascader, Form } from 'antd';

import { IBuilding } from '@/features/buildings/types';
import { CascaderOption } from '@/utils/responseUtils';

import type { CascaderProps, GetProp } from 'antd';
import { useGetAreaHierarchyQuery } from '@/features/areas/areasApiSlice';

type DefaultOptionType = GetProp<CascaderProps, 'options'>[number];

interface IBuildingAddressProps {
  building: IBuilding;
}

export default function BuildingAddress({ building }: IBuildingAddressProps) {
  const [form] = Form.useForm();
  const { data: areas } = useGetAreaHierarchyQuery();

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
      initialValues={{
        areas: building.areas ? building.areas.map((area) => area.code) : [],
      }}
    >
      <Form.Item
        name='areas'
        label='Ýerleşýän ýeri'
        rules={[{ required: true }]}
      >
        <Cascader
          style={{ width: 500 }}
          options={areas?.options}
          onChange={onChange}
          showSearch={{ filter }}
          placeholder='Yeri sayla'
          onSearch={(value) => console.log(value)}
        />
      </Form.Item>
    </Form>
  );
}
