import SubmitButton from '@/components/button/SubmitButton';
import { useUpdateBuildingSquareMutation } from '@/features/buildings/buildingsApiSlice';
import { IBuilding, IBuildingSquare } from '@/features/buildings/types';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useMessageApi } from '@/utils/messages';
import { Divider, Form, Input, InputNumber, Select } from 'antd';

interface IProps {
  building: IBuilding;
}

const squareUnits = [
  {
    label: 'm2',
    value: 'm2',
  },
  {
    label: 'ga',
    value: 'ga',
  },
];

export default function BuildingSquare({ building }: IProps) {
  const { id } = useIsNew();
  const { messageApi } = useMessageApi();

  const [form] = Form.useForm<IBuildingSquare>();

  const [updateSquare, { isLoading: isLoadingUpdateSquare }] =
    useUpdateBuildingSquareMutation();

  const onFinish = async (values: IBuildingSquare) => {
    try {
      await updateSquare({ id: id!, ...values });
      messageApi.success('Desganyň squarei täzelendi');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Form
      form={form}
      name='building_square_form'
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      initialValues={{
        ...building,
      }}
      onFinish={onFinish}
    >
      <Divider>Umumy meýdan</Divider>
      <Form.Item<IBuildingSquare> name='square_1' label='Umumy meýdany'>
        <InputNumber style={{ width: 200 }} />
      </Form.Item>
      <Form.Item<IBuildingSquare> name='square_1_name' label='Ölçeg birligi'>
        <Select options={squareUnits} style={{ width: 200 }} />
      </Form.Item>
      <Divider>Goşmaça meýdan 1</Divider>
      <Form.Item<IBuildingSquare> name='square_2' label='Goşmaça meýdan 1'>
        <InputNumber style={{ width: 200 }} />
      </Form.Item>
      <Form.Item<IBuildingSquare> name='square_2_name' label='Ölçeg birligi'>
        <Select options={squareUnits} style={{ width: 200 }} />
      </Form.Item>
      <Divider>Goşmaça meýdan 2</Divider>
      <Form.Item<IBuildingSquare> name='square_3' label='Goşmaça meýdan 2'>
        <InputNumber style={{ width: 200 }} />
      </Form.Item>

      <Form.Item<IBuildingSquare> name='square_3_name' label='Ölçeg birligi'>
        <Select options={squareUnits} style={{ width: 200 }} />
      </Form.Item>
      <Divider />
      <Form.Item<IBuildingSquare>
        name='square_additional_info'
        label='Goşmaça maglumat'
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 21, span: 3 }}>
        <SubmitButton loading={isLoadingUpdateSquare} />
      </Form.Item>
    </Form>
  );
}
