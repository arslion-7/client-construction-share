import { Cascader, Form, Skeleton } from 'antd';

import { IBuilding } from '@/features/buildings/types';
import { CascaderOption } from '@/utils/responseUtils';

import type { CascaderProps, GetProp } from 'antd';
import { useGetAreaHierarchyQuery } from '@/features/areas/areasApiSlice';
import SubmitButton from '@/components/button/SubmitButton';
import {
  useCreateBuildingMutation,
  useUpdateBuildingAddressMutation,
} from '@/features/buildings/buildingsApiSlice';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useNavigate } from 'react-router';
import { useMessageApi } from '@/utils/messages';

type DefaultOptionType = GetProp<CascaderProps, 'options'>[number];

interface IBuildingAddressProps {
  building: IBuilding;
}

interface IAddressForm {
  areas: number[];
}

export default function BuildingAddress({ building }: IBuildingAddressProps) {
  const { id, isNew } = useIsNew();
  const navigate = useNavigate();
  const { messageApi } = useMessageApi();

  const [form] = Form.useForm<IAddressForm>();
  const { data: areas, isLoading: isLoadingAreas } = useGetAreaHierarchyQuery();

  const [createBuilding, { isLoading: isLoadingCreate }] =
    useCreateBuildingMutation();

  const [updateAddress, { isLoading: isLoadingUpdateAddress }] =
    useUpdateBuildingAddressMutation();

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

  const onFinish = async (values: IAddressForm) => {
    if (!isNew) {
      await updateAddress({ id: id!, areas: values.areas });
      messageApi.success('Desga täzelendi');
      return;
    }
    const createdBuilding = await createBuilding(values).unwrap();
    console.log('createdBuilding', createdBuilding);
    navigate(`/buildings/${createdBuilding.id}`);
    messageApi.success('Täze desga goşuldy');
  };

  return (
    <Form
      form={form}
      initialValues={{
        areas:
          !isNew && building.areas
            ? building.areas.map((area) => area.code)
            : [],
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name='areas'
        label='Ýerleşýän ýeri'
        rules={[{ required: true }]}
      >
        <Cascader
          loading={isLoadingAreas}
          style={{ width: 500 }}
          options={areas?.options}
          onChange={onChange}
          showSearch={{ filter }}
          placeholder='Yeri sayla'
          onSearch={(value) => console.log(value)}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 21, span: 3 }}>
        <SubmitButton
          loading={isLoadingUpdateAddress || isLoadingCreate}
          size='middle'
        />
      </Form.Item>
    </Form>
  );
}
