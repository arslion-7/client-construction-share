import React, { useState } from 'react';
import {
  Card,
  Descriptions,
  Typography,
  Spin,
  Button,
  Space,
  Divider,
  Modal,
  Form,
  Input,
  DatePicker,
  message,
} from 'antd';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router';
import {
  useGetOldRegistryQuery,
  useUpdateOldRegistryMutation,
} from '../../features/oldRegistries/oldRegistriesApiSlice';
import OldRegistryBreadcrumb from './OldRegistryBreadcrumb';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

interface AlanFormData {
  wezipe_alan_adam?: string;
  ady_alan_adam?: string;
  sene_san_sertnama?: dayjs.Dayjs | string; // Using dayjs.Dayjs for DatePicker compatibility
}

const OldRegistry: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm<AlanFormData>();
  const [messageApi, contextHolder] = message.useMessage();

  const {
    data: oldRegistry,
    isLoading,
    error,
  } = useGetOldRegistryQuery(id || '');

  const [updateOldRegistry, { isLoading: isUpdating }] =
    useUpdateOldRegistryMutation();

  const handleBack = () => {
    navigate('/old-registries');
  };

  // Handle Alan button click
  const handleAlanClick = () => {
    // Pre-fill form with existing data
    let dateValue = undefined;
    if (oldRegistry?.sene_san_sertnama) {
      const parsed = dayjs(oldRegistry.sene_san_sertnama);
      dateValue = parsed.isValid() ? parsed : undefined;
    }

    form.setFieldsValue({
      wezipe_alan_adam: oldRegistry?.wezipe_alan_adam || '',
      ady_alan_adam: oldRegistry?.ady_alan_adam || '',
      sene_san_sertnama: dateValue,
    });
    setIsModalVisible(true);
  };

  // Handle form submission
  const handleFormSubmit = async (values: AlanFormData) => {
    try {
      // Prepare data for API call
      const updateData = {
        wezipe_alan_adam: values.wezipe_alan_adam,
        ady_alan_adam: values.ady_alan_adam,
        sene_san_sertnama: values.sene_san_sertnama
          ? dayjs(values.sene_san_sertnama).format('YYYY-MM-DD')
          : undefined,
      };

      // Call the API
      await updateOldRegistry({
        id: id || '',
        data: updateData,
      }).unwrap();

      messageApi.success('Alan maglumatlary üstünlikli täzelendi!');
      setIsModalVisible(false);
    } catch {
      messageApi.error('Alan maglumatlary täzelenende ýalňyşlyk ýüze çykdy!');
    }
  };

  // Handle modal cancel
  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Helper function to format dates
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    try {
      // Try to parse with dayjs - it's more flexible with date formats
      const parsed = dayjs(dateString);
      if (parsed.isValid()) {
        return parsed.format('DD.MM.YYYY');
      }
      // If dayjs can't parse it, return the original string
      return dateString;
    } catch {
      return dateString;
    }
  };

  // Helper function to format long text
  const formatLongText = (text?: string) => {
    if (!text) return '-';
    return text.length > 100 ? `${text.substring(0, 100)}...` : text;
  };

  if (error) {
    return (
      <div style={{ padding: '24px' }}>
        <Card>
          <Title level={4} style={{ color: 'red' }}>
            Error loading old registry
          </Title>
          <Button onClick={handleBack} icon={<ArrowLeftOutlined />}>
            Back to List
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      {contextHolder}
      <div style={{ marginBottom: '16px' }}>
        <OldRegistryBreadcrumb />
      </div>

      <Card>
        <div style={{ marginBottom: '16px' }}>
          <Space>
            <Button onClick={handleBack} icon={<ArrowLeftOutlined />}>
              Back to List
            </Button>
            <Button
              type='primary'
              icon={<EditOutlined />}
              onClick={handleAlanClick}
            >
              Alan
            </Button>
          </Space>
        </div>

        <Spin spinning={isLoading}>
          {oldRegistry && (
            <>
              <div style={{ marginBottom: '24px' }}>
                <Title level={2}>Old Registry Details</Title>
                <Text type='secondary'>T/B: {oldRegistry.t_b}</Text>
              </div>

              <Descriptions
                title='Basic Information'
                bordered
                column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                size='small'
              >
                <Descriptions.Item label='T/B' span={1}>
                  {oldRegistry.t_b || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Min Hat' span={1}>
                  {oldRegistry.min_hat || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Sene Hat Min To Mud' span={1}>
                  {formatDate(oldRegistry.sene_hat_min_to_mud)}
                </Descriptions.Item>
                <Descriptions.Item label='Login' span={1}>
                  {oldRegistry.login || '-'}
                </Descriptions.Item>
              </Descriptions>

              <Divider />

              <Descriptions
                title='Contractor Information'
                bordered
                column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                size='small'
                style={{ marginTop: '24px' }}
              >
                <Descriptions.Item label='Gurujy' span={2}>
                  {oldRegistry.gurujy || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Sertnama Gurujy Paychy' span={1}>
                  {oldRegistry.sertnama_gurujy_paychy || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Salgy Gurujy' span={1}>
                  {oldRegistry.salgy_gurujy || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Bash Potr' span={1}>
                  {oldRegistry.bash_potr || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Sertnama Gur Potr' span={1}>
                  {oldRegistry.sertnama_gur_potr || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Potratchy Komek' span={1}>
                  {oldRegistry.potratchy_komek || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Shahadatnama' span={1}>
                  {oldRegistry.shahadatnama || '-'}
                </Descriptions.Item>
              </Descriptions>

              <Descriptions
                title='Project Information'
                bordered
                column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                size='small'
                style={{ marginTop: '24px' }}
              >
                <Descriptions.Item label='Desga' span={2}>
                  {oldRegistry.desga || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Salgy Desga' span={2}>
                  {oldRegistry.salgy_desga || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Baha Umumy' span={1}>
                  {oldRegistry.baha_umumy || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Meydan Umumy' span={1}>
                  {oldRegistry.meydan_umumy || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Kep Resminama' span={1}>
                  {oldRegistry.kep_resminama || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Sene Bashy Songy' span={1}>
                  {oldRegistry.sene_bashy_songy || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Sene Seredilen' span={1}>
                  {formatDate(oldRegistry.sene_seredilen)}
                </Descriptions.Item>
                <Descriptions.Item label='Sene Hasaba Alnan' span={1}>
                  {oldRegistry.sene_hasaba_alnan || '-'}
                </Descriptions.Item>
              </Descriptions>

              <Descriptions
                title='Client Information'
                bordered
                column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                size='small'
                style={{ marginTop: '24px' }}
              >
                <Descriptions.Item label='Paychy' span={2}>
                  {oldRegistry.paychy || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Emlak Paychy' span={1}>
                  {oldRegistry.emlak_paychy || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Salgy Paychy' span={1}>
                  {oldRegistry.salgy_paychy || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Baha Paychy' span={1}>
                  {oldRegistry.baha_paychy || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Baha 1m2 Paychy' span={1}>
                  {oldRegistry.baha_1m2_paychy || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Ady Paychy Alan' span={1}>
                  {oldRegistry.ady_paychy_alan || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Sene Paychy Alan' span={1}>
                  {oldRegistry.sene_paychy_alan || '-'}
                </Descriptions.Item>
              </Descriptions>

              <Descriptions
                title='Documents and Certificates'
                bordered
                column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                size='small'
                style={{ marginTop: '24px' }}
              >
                <Descriptions.Item label='Ygtyyarnama' span={2}>
                  {formatLongText(oldRegistry.ygtyyarnama)}
                </Descriptions.Item>
                <Descriptions.Item label='Patent Pasport' span={2}>
                  {formatLongText(oldRegistry.patent_pasport)}
                </Descriptions.Item>
                <Descriptions.Item label='Sene San Sertnama' span={1}>
                  {formatDate(oldRegistry.sene_san_sertnama)}
                </Descriptions.Item>
                <Descriptions.Item label='Wezipe Alan Adam' span={1}>
                  {oldRegistry.wezipe_alan_adam || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Ady Alan Adam' span={1}>
                  {oldRegistry.ady_alan_adam || '-'}
                </Descriptions.Item>
              </Descriptions>

              <Descriptions
                title='System Information'
                bordered
                column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                size='small'
                style={{ marginTop: '24px' }}
              >
                <Descriptions.Item label='ID' span={1}>
                  {oldRegistry.id || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Created At' span={1}>
                  {formatDate(oldRegistry.created_at)}
                </Descriptions.Item>
                <Descriptions.Item label='Updated At' span={1}>
                  {formatDate(oldRegistry.updated_at)}
                </Descriptions.Item>
                <Descriptions.Item label='Deleted At' span={1}>
                  {formatDate(oldRegistry.deleted_at)}
                </Descriptions.Item>
              </Descriptions>
            </>
          )}
        </Spin>
      </Card>

      {/* Alan Modal */}
      <Modal
        title='Alan Maglumatlary Täzelemek'
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout='vertical'
          onFinish={handleFormSubmit}
          style={{ marginTop: '16px' }}
        >
          <Form.Item
            label='Wezipe Alan Adam'
            name='wezipe_alan_adam'
            rules={[
              { required: true, message: 'Wezipe alan adamyň adyny giriziň!' },
            ]}
          >
            <Input placeholder='Wezipe alan adamyň ady' />
          </Form.Item>

          <Form.Item
            label='Ady Alan Adam'
            name='ady_alan_adam'
            rules={[
              { required: true, message: 'Ady alan adamyň adyny giriziň!' },
            ]}
          >
            <Input placeholder='Ady alan adamyň ady' />
          </Form.Item>

          <Form.Item
            label='Sene San Sertnama'
            name='sene_san_sertnama'
            rules={[
              { required: true, message: 'Sene san sertnamasyny saýlaň!' },
            ]}
          >
            <DatePicker
              placeholder='Sene san sertnama'
              style={{ width: '100%' }}
              format='DD.MM.YYYY'
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={handleModalCancel}>Ýatyr</Button>
              <Button type='primary' htmlType='submit' loading={isUpdating}>
                Ýatda Sakla
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OldRegistry;
