import React from 'react';
import { Card, Descriptions, Typography, Spin, Button, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router';
import { useGetOldRegistryQuery } from '../../features/oldRegistries/oldRegistriesApiSlice';
import OldRegistryBreadcrumb from './OldRegistryBreadcrumb';

const { Title, Text } = Typography;

const OldRegistry: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: oldRegistry,
    isLoading,
    error,
  } = useGetOldRegistryQuery(id || '');

  const handleBack = () => {
    navigate('/old-registries');
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
      <div style={{ marginBottom: '16px' }}>
        <OldRegistryBreadcrumb />
      </div>

      <Card>
        <div style={{ marginBottom: '16px' }}>
          <Space>
            <Button onClick={handleBack} icon={<ArrowLeftOutlined />}>
              Back to List
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
                  {oldRegistry.sene_hat_min_to_mud || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Login' span={1}>
                  {oldRegistry.login || '-'}
                </Descriptions.Item>
              </Descriptions>

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
                  {oldRegistry.sene_seredilen || '-'}
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
                  {oldRegistry.ygtyyarnama || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Patent Pasport' span={2}>
                  {oldRegistry.patent_pasport || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Sene San Sertnama' span={1}>
                  {oldRegistry.sene_san_sertnama || '-'}
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
                <Descriptions.Item label='Created At' span={1}>
                  {oldRegistry.created_at || '-'}
                </Descriptions.Item>
                <Descriptions.Item label='Updated At' span={1}>
                  {oldRegistry.updated_at || '-'}
                </Descriptions.Item>
              </Descriptions>
            </>
          )}
        </Spin>
      </Card>
    </div>
  );
};

export default OldRegistry;
