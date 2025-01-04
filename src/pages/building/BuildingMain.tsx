import SubmitButton from '@/components/button/SubmitButton';
import { useUpdateBuildingMainMutation } from '@/features/buildings/buildingsApiSlice';
import { IBuilding, IBuildingMain } from '@/features/buildings/types';
import { dateFormat } from '@/utils/formats';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { useMessageApi } from '@/utils/messages';
import { DatePicker, Form, Input, InputNumber } from 'antd';
import dayjs from 'dayjs';

interface IProps {
  building: IBuilding;
}

export default function BuildingMain({ building }: IProps) {
  const { id } = useIsNew();
  const { messageApi } = useMessageApi();

  const [form] = Form.useForm<IBuildingMain>();

  const [updateMain, { isLoading: isLoadingUpdateMain }] =
    useUpdateBuildingMainMutation();

  const onFinish = async (values: IBuildingMain) => {
    try {
      await updateMain({ id: id!, ...values });
      messageApi.success('Desganyň esasy maglumaty täzelendi');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Form
      form={form}
      name='building_main_form'
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      initialValues={{
        ...building,
        start_date: building.start_date && dayjs(building.start_date),
        end_date: building.end_date && dayjs(building.end_date)
      }}
      onFinish={onFinish}
    >
      <Form.Item<IBuildingMain> name='t_b' label='Tertip belgisi'>
        <InputNumber style={{ width: 300 }} />
      </Form.Item>
      <Form.Item<IBuildingMain>
        name='ident_number'
        label='Identifikasiýa belgisi'
      >
        <InputNumber style={{ width: 300 }} />
      </Form.Item>
      <Form.Item<IBuildingMain> name='kind' label='Görnüşi'>
        <Input />
      </Form.Item>
      <Form.Item<IBuildingMain> name='kind' label='Görnüşi'>
        <Input />
      </Form.Item>
      <Form.Item<IBuildingMain> name='price' label='Bahasy'>
        <InputNumber style={{ width: 300 }} suffix='TMT' />
      </Form.Item>
      <Form.Item<IBuildingMain> name='percentage' label='Göterimi'>
        <InputNumber suffix='%' />
      </Form.Item>
      <Form.Item<IBuildingMain> name='start_date' label='Gurluşygyň başy'>
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item<IBuildingMain> name='end_date' label='Gurluşygyň soňy'>
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 21, span: 3 }}>
        <SubmitButton loading={isLoadingUpdateMain} />
      </Form.Item>
    </Form>
  );
}
