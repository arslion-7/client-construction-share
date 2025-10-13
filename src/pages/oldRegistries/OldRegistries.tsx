import React, { useEffect, useState } from 'react';
import { Card, Table, Input, Typography, Spin, Button, Space, Tag } from 'antd';
import { SearchOutlined, EyeOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useGetOldRegistriesQuery } from '../../features/oldRegistries/oldRegistriesApiSlice';
import OldRegistriesBreadcrumb from './OldRegistriesBreadcrumb';
import { useNavigate, useSearchParams } from 'react-router';

const { Title, Text } = Typography;

const OldRegistries: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get values from URL or defaults
  const page = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || 10;
  const urlSearch = searchParams.get('search') || '';

  const [searchInput, setSearchInput] = useState(urlSearch);

  // Sync searchInput with URL on mount/change
  useEffect(() => {
    setSearchInput(urlSearch);
  }, [urlSearch]);

  const { data, isLoading, error } = useGetOldRegistriesQuery({
    page,
    limit: pageSize,
    search: urlSearch,
  });

  const handleViewDetails = (record: { t_b: number }) => {
    navigate(`/old-registries/${record.t_b}`);
  };

  const handleSearch = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('search', searchInput);
    newSearchParams.set('page', '1'); // Reset to first page when searching
    setSearchParams(newSearchParams);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('search');
    newSearchParams.set('page', '1');
    setSearchParams(newSearchParams);
  };

  const columns = [
    {
      title: 'T/B',
      dataIndex: 't_b',
      key: 't_b',
      width: 80,
      render: (value: number) => value || '-',
    },
    {
      title: 'Min Hat',
      dataIndex: 'min_hat',
      key: 'min_hat',
      width: 200,
      render: (value: string) => value || '-',
    },
    {
      title: 'Gurujy',
      dataIndex: 'gurujy',
      key: 'gurujy',
      width: 250,
      render: (value: string) => value || '-',
    },
    {
      title: 'Paychy',
      dataIndex: 'paychy',
      key: 'paychy',
      width: 200,
      render: (value: string) => value || '-',
    },
    {
      title: 'Desga',
      dataIndex: 'desga',
      key: 'desga',
      width: 300,
      render: (value: string) => value || '-',
    },
    {
      title: 'Baha Umumy',
      dataIndex: 'baha_umumy',
      key: 'baha_umumy',
      width: 120,
      render: (value: string) => value || '-',
    },
    {
      title: 'Login',
      dataIndex: 'login',
      key: 'login',
      width: 120,
      render: (value: string) => value || '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (_: unknown, record: { t_b: number }) => (
        <Button
          type='link'
          icon={<EyeOutlined />}
          onClick={() => handleViewDetails(record)}
          size='small'
        >
          View
        </Button>
      ),
    },
  ];

  const handleTableChange = (pagination: {
    current?: number;
    pageSize?: number;
  }) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (pagination.pageSize && pagination.pageSize !== pageSize) {
      // Page size changed - reset to page 1
      newSearchParams.set('pageSize', pagination.pageSize.toString());
      newSearchParams.set('page', '1');
    } else if (pagination.current) {
      // Page changed
      newSearchParams.set('page', pagination.current.toString());
    }

    setSearchParams(newSearchParams);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Check if record contains OTKAZ text (case-insensitive)
  const hasOtkazText = (record: any) => {
    const adyPaychyAlan = record.ady_paychy_alan?.toLowerCase() || '';
    return adyPaychyAlan.includes('otkaz');
  };

  if (error) {
    return (
      <div style={{ padding: '24px' }}>
        <Card>
          <Title level={4} style={{ color: 'red' }}>
            Error loading old registries
          </Title>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '16px' }}>
        <OldRegistriesBreadcrumb />
      </div>
      <Card>
        <div style={{ marginBottom: '16px' }}>
          <Title level={2}>Old Registries</Title>
          <p>Legacy data migrated from MySQL database</p>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Space direction='vertical' style={{ width: '100%' }}>
            <Space>
              <Input
                placeholder='Search by T/B number, min hat, gurujy, paychy, desga, addresses, or login...'
                prefix={<SearchOutlined />}
                value={searchInput}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                style={{ width: '400px' }}
                allowClear
              />
              <Button
                type='primary'
                onClick={handleSearch}
                loading={isLoading}
                disabled={isLoading}
              >
                Search
              </Button>
              {urlSearch && (
                <Button onClick={handleClearSearch} disabled={isLoading}>
                  Clear
                </Button>
              )}
            </Space>
            <Space>
              <InfoCircleOutlined style={{ color: '#faad14' }} />
              <Text type='secondary'>
                <Tag color='gold' style={{ margin: 0 }}>Reňkli setirler</Tag>
                - OTKAZ (çep tarapynda sarymtyl çyzyk)
              </Text>
            </Space>
          </Space>
        </div>

        <Spin spinning={isLoading}>
          <Table
            columns={columns}
            dataSource={data?.data || []}
            rowKey='id'
            pagination={{
              current: page,
              pageSize: pageSize,
              total: data?.pagination?.total || 0,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              pageSizeOptions: ['10', '20', '50', '100'],
            }}
            onChange={handleTableChange}
            onRow={(record) => ({
              onClick: () => handleViewDetails(record),
              style: {
                cursor: 'pointer',
                backgroundColor: hasOtkazText(record) ? '#fffbe6' : undefined,
                borderLeft: hasOtkazText(record) ? '4px solid #faad14' : undefined,
                color: hasOtkazText(record) ? '#000000' : undefined,
                fontWeight: hasOtkazText(record) ? 500 : undefined,
              },
            })}
            rowClassName={(record) => hasOtkazText(record) ? 'otkaz-row' : ''}
            scroll={{ x: 1200 }}
            size='small'
          />
        </Spin>
      </Card>
    </div>
  );
};

export default OldRegistries;
