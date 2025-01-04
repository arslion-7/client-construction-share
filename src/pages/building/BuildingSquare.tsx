import SubmitButton from '@/components/button/SubmitButton';
import { useUpdateBuildingSquareMutation } from '@/features/buildings/buildingsApiSlice';
import { IBuilding, IBuildingSquare } from '@/features/buildings/types';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useMessageApi } from '@/utils/messages';
import { Form, Input, InputNumber } from 'antd';

interface IProps {
  building: IBuilding;
}

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
        ...building
      }}
      onFinish={onFinish}
    >
      <Form.Item<IBuildingSquare> name='square_1' label='square_1'>
        <InputNumber />
      </Form.Item>
      <Form.Item<IBuildingSquare> name='square_1_name' label='square_1_name'>
        <Input />
      </Form.Item>
      <Form.Item<IBuildingSquare> name='square_2' label='square_2'>
        <InputNumber />
      </Form.Item>
      <Form.Item<IBuildingSquare> name='square_2_name' label='square_2_name'>
        <Input />
      </Form.Item>
      <Form.Item<IBuildingSquare> name='square_3' label='square_3'>
        <InputNumber />
      </Form.Item>
      <Form.Item<IBuildingSquare> name='square_3_name' label='square_3_name'>
        <Input />
      </Form.Item>
      <Form.Item<IBuildingSquare>
        name='square_additional_info'
        label='square_additional_info'
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 21, span: 3 }}>
        <SubmitButton loading={isLoadingUpdateSquare} />
      </Form.Item>
    </Form>
  );
}
