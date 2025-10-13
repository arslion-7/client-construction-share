import React, { useState } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  DatePicker,
  Input,
  Select,
  message,
  Popconfirm,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import {
  useGetAdditionalAgreementsQuery,
  useCreateAdditionalAgreementMutation,
  useUpdateAdditionalAgreementMutation,
  useDeleteAdditionalAgreementMutation,
} from '@/features/additionalAgreements/additionalAgreementsApiSlice';
import type { AdditionalAgreement } from '@/features/additionalAgreements/types';

interface AdditionalAgreementsProps {
  registryId: number;
}

const REASON_OPTIONS = [
  { value: 'Familiýasy üýtgedi', label: 'Familiýasy üýtgedi' },
  { value: 'Bahasy üýtgedi', label: 'Bahasy üýtgedi' },
  { value: 'Pasporty çalşdy', label: 'Pasporty çalşdy' },
  { value: 'Meýdany üýtgedi', label: 'Meýdany üýtgedi' },
  { value: 'Aradan çykdy', label: 'Aradan çykdy' },
  { value: 'Ýatyryldy', label: 'Ýatyryldy' },
  { value: 'Başga adamyň adyna geçdi', label: 'Başga adamyň adyna geçdi' },
  { value: 'Gurujy üýtgedi', label: 'Gurujy üýtgedi' },
  { value: 'Gurluşygyň möhleti üýtgedi', label: 'Gurluşygyň möhleti üýtgedi' },
];

const AdditionalAgreements: React.FC<AdditionalAgreementsProps> = ({
  registryId,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAgreement, setEditingAgreement] =
    useState<AdditionalAgreement | null>(null);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const { data, isLoading } = useGetAdditionalAgreementsQuery(registryId);
  const [createAgreement, { isLoading: isCreating }] =
    useCreateAdditionalAgreementMutation();
  const [updateAgreement, { isLoading: isUpdating }] =
    useUpdateAdditionalAgreementMutation();
  const [deleteAgreement] = useDeleteAdditionalAgreementMutation();

  const handleAdd = () => {
    setEditingAgreement(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: AdditionalAgreement) => {
    setEditingAgreement(record);
    form.setFieldsValue({
      agreement_number: record.agreement_number || '',
      agreement_date: record.agreement_date
        ? dayjs(record.agreement_date)
        : null,
      reason: record.reason || undefined,
      additional_info: record.additional_info || '',
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAgreement(id).unwrap();
      messageApi.success('Goşmaça şertnama üstünlikli pozuldy!');
    } catch {
      messageApi.error('Goşmaça şertnamasyny pozmakda ýalňyşlyk ýüze çykdy!');
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const agreementDate = values.agreement_date
        ? dayjs(values.agreement_date).format('YYYY-MM-DD')
        : '';

      const payload = {
        agreement_number: values.agreement_number || '',
        agreement_date: agreementDate,
        reason: values.reason || '',
        additional_info: values.additional_info || '',
      };

      if (editingAgreement) {
        // Update existing
        await updateAgreement({
          id: editingAgreement.id,
          data: payload,
        }).unwrap();
        messageApi.success('Goşmaça şertnama üstünlikli täzelendi!');
      } else {
        // Create new
        await createAgreement({
          registry_id: registryId,
          ...payload,
        }).unwrap();
        messageApi.success('Goşmaça şertnama üstünlikli döredildi!');
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch {
      messageApi.error('Goşmaça şertnama bilen işlemekde ýalňyşlyk ýüze çykdy!');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingAgreement(null);
    form.resetFields();
  };

  const columns = [
    {
      title: '№',
      key: 'index',
      width: 60,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Şertnama belgisi',
      dataIndex: 'agreement_number',
      key: 'agreement_number',
      render: (text: string) => text || '-',
    },
    {
      title: 'Şertnama senesi',
      dataIndex: 'agreement_date',
      key: 'agreement_date',
      render: (date: string) =>
        date ? dayjs(date).format('DD.MM.YYYY') : '-',
    },
    {
      title: 'Sebäbi',
      dataIndex: 'reason',
      key: 'reason',
      render: (text: string) => text || '-',
    },
    {
      title: 'Goşmaça maglumat',
      dataIndex: 'additional_info',
      key: 'additional_info',
      render: (text: string) => text || '-',
    },
    {
      title: 'Döredilen',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => dayjs(date).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: 'Hereketler',
      key: 'actions',
      width: 150,
      render: (_: any, record: AdditionalAgreement) => (
        <Space>
          <Button
            type='link'
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size='small'
          >
            Üýtget
          </Button>
          <Popconfirm
            title='Goşmaça şertnamasyny pozmak'
            description='Bu goşmaça şertnamasyny pozmak isleýärsiňizmi?'
            onConfirm={() => handleDelete(record.id)}
            okText='Hawa'
            cancelText='Ýok'
          >
            <Button
              type='link'
              danger
              icon={<DeleteOutlined />}
              size='small'
            >
              Poz
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <div style={{ marginBottom: 16 }}>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          Goşmaça şertnama goş
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data?.data || []}
        rowKey='id'
        loading={isLoading}
        pagination={false}
        size='small'
      />

      <Modal
        title={
          editingAgreement
            ? 'Goşmaça şertnamasyny üýtgetmek'
            : 'Täze goşmaça şertnama goşmak'
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={500}
        maskClosable={false}
      >
        <Form
          form={form}
          layout='vertical'
          onFinish={handleSubmit}
          style={{ marginTop: 16 }}
        >
          <Form.Item
            label='Şertnama belgisi'
            name='agreement_number'
          >
            <Input placeholder='Şertnama belgisini giriziň' />
          </Form.Item>

          <Form.Item
            label='Şertnama senesi'
            name='agreement_date'
            rules={[{ required: true, message: 'Şertnama senesini saýlaň!' }]}
          >
            <DatePicker
              placeholder='Şertnama senesi'
              style={{ width: '100%' }}
              format='DD.MM.YYYY'
            />
          </Form.Item>

          <Form.Item
            label='Sebäbi'
            name='reason'
          >
            <Select
              placeholder='Sebäbini saýlaň'
              options={REASON_OPTIONS}
              allowClear
            />
          </Form.Item>

          <Form.Item
            label='Goşmaça maglumat'
            name='additional_info'
          >
            <Input.TextArea
              placeholder='Goşmaça maglumat giriziň'
              rows={4}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={handleCancel}>Ýatyr</Button>
              <Button
                type='primary'
                htmlType='submit'
                loading={isCreating || isUpdating}
              >
                {editingAgreement ? 'Täzele' : 'Goş'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdditionalAgreements;
