import SubmitButton from '@/components/button/SubmitButton';
import { useUpdateBuildingOrderMutation } from '@/features/buildings/buildingsApiSlice';
import { IBuilding, IBuildingOrder } from '@/features/buildings/types';
import { dateFormat } from '@/utils/formats';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useMessageApi } from '@/utils/messages';
import { DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';

interface IProps {
  building: IBuilding;
}

export default function BuildingOrder({ building }: IProps) {
  const { id } = useIsNew();
  const { messageApi } = useMessageApi();

  const [form] = Form.useForm<IBuildingOrder>();

  const [updateOrder, { isLoading: isLoadingUpdateOrder }] =
    useUpdateBuildingOrderMutation();

  const onFinish = async (values: IBuildingOrder) => {
    try {
      await updateOrder({ id: id!, ...values });
      messageApi.success('Desganyň orderi täzelendi');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Form
      form={form}
      name='building_order_form'
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      initialValues={{
        ...building,
        order_date: building.order_date && dayjs(building.order_date)
      }}
      onFinish={onFinish}
    >
      <Form.Item<IBuildingOrder>
        name='order_whose_what'
        label='order_whose_what'
      >
        <Input />
      </Form.Item>
      <Form.Item<IBuildingOrder> name='order_date' label='order_date'>
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item<IBuildingOrder> name='order_code' label='order_code'>
        <Input />
      </Form.Item>
      <Form.Item<IBuildingOrder>
        name='order_additional_info'
        label='order_additional_info'
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 21, span: 3 }}>
        <SubmitButton loading={isLoadingUpdateOrder} />
      </Form.Item>
    </Form>
  );
}
