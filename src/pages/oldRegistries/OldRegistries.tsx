import React, { useState } from 'react';
import { Card, Table, Input, Typography, Spin, Button, Space } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { useGetOldRegistriesQuery } from '../../features/oldRegistries/oldRegistriesApiSlice';
import OldRegistriesBreadcrumb from './OldRegistriesBreadcrumb';
import { useNavigate } from 'react-router';

const { Title } = Typography;

const OldRegistries: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, error } = useGetOldRegistriesQuery({
    page,
    limit: pageSize,
    search: searchTerm,
  });

  const handleViewDetails = (record: { t_b: number }) => {
    navigate(`/old-registries/${record.t_b}`);
  };

  const handleSearch = () => {
    setSearchTerm(searchInput);
    setPage(1); // Reset to first page when searching
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearchTerm('');
    setPage(1);
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
    if (pagination.current) setPage(pagination.current);
    if (pagination.pageSize) setPageSize(pagination.pageSize);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
          <Space>
            <Input
              placeholder='Search by min hat, gurujy, paychy, desga, addresses, or login...'
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
            {searchTerm && (
              <Button onClick={handleClearSearch} disabled={isLoading}>
                Clear
              </Button>
            )}
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
              style: { cursor: 'pointer' },
            })}
            scroll={{ x: 1200 }}
            size='small'
          />
        </Spin>
      </Card>
    </div>
  );
};

export default OldRegistries;
