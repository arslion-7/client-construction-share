import SubmitButton from '@/components/button/SubmitButton';
import { useUpdateBuildingCertMutation } from '@/features/buildings/buildingsApiSlice';
import { IBuilding, IBuildingCert } from '@/features/buildings/types';
import { dateFormat } from '@/utils/formats';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useMessageApi } from '@/utils/messages';
import { DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';

interface IProps {
  building: IBuilding;
}

export default function BuildingCert({ building }: IProps) {
  const { id } = useIsNew();
  const { messageApi } = useMessageApi();

  const [form] = Form.useForm<IBuildingCert>();

  const [updateCert, { isLoading: isLoadingUpdateCert }] =
    useUpdateBuildingCertMutation();

  const onFinish = async (values: IBuildingCert) => {
    try {
      await updateCert({ id: id!, ...values });
      messageApi.success('Desganyň certi täzelendi');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Form
      form={form}
      name='building_cert_form'
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      initialValues={{
        ...building,
        cert_1_date: building.cert_1_date && dayjs(building.cert_1_date),
        cert_2_date: building.cert_2_date && dayjs(building.cert_2_date)
      }}
      onFinish={onFinish}
    >
      <Form.Item<IBuildingCert> name='cert_name' label='cert_name'>
        <Input />
      </Form.Item>
      <Form.Item<IBuildingCert> name='cert_1_date' label='cert_1_date'>
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item<IBuildingCert> name='cert_1_code' label='cert_1_code'>
        <Input />
      </Form.Item>
      <Form.Item<IBuildingCert> name='cert_2_date' label='cert_2_date'>
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item<IBuildingCert> name='cert_2_code' label='cert_2_code'>
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 21, span: 3 }}>
        <SubmitButton loading={isLoadingUpdateCert} />
      </Form.Item>
    </Form>
  );
}
