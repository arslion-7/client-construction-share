import React, { useState } from 'react';
import {
  Card,
  Table,
  Input,
  Typography,
  Spin,
  Button,
  Space,
  Tag,
  Popconfirm,
  message,
  Upload,
  Modal,
  Descriptions,
} from 'antd';
import {
  SearchOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  SwapOutlined,
  UndoOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  useGetOldRegistriesQuery,
  useMigrateOldRegistriesMutation,
  useRollbackOldRegistriesMigrationMutation,
  useImportAgreementsMutation,
  useRollbackImportedAgreementsMutation,
  ImportAgreementsResponse,
} from '../../features/oldRegistries/oldRegistriesApiSlice';
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

  // Sync searchInput when the URL search param changes (e.g. back/forward nav).
  // Adjusting state during render is preferred over an effect for this.
  const [prevUrlSearch, setPrevUrlSearch] = useState(urlSearch);
  if (urlSearch !== prevUrlSearch) {
    setPrevUrlSearch(urlSearch);
    setSearchInput(urlSearch);
  }

  const { data, isLoading, error } = useGetOldRegistriesQuery({
    page,
    limit: pageSize,
    search: urlSearch,
  });

  const [migrateOldRegistries, { isLoading: isMigrating }] =
    useMigrateOldRegistriesMutation();
  const [rollbackMigration, { isLoading: isRollingBack }] =
    useRollbackOldRegistriesMigrationMutation();

  const handleMigrate = async () => {
    try {
      const result = await migrateOldRegistries().unwrap();
      const created = Object.entries(result.created || {})
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ');
      message.success(
        `Migrated: ${result.migrated}, skipped: ${result.skipped}, total: ${result.total}` +
          (created ? `. Created — ${created}` : ''),
        10
      );
    } catch {
      message.error('Migration failed');
    }
  };

  const handleRollback = async () => {
    try {
      const result = await rollbackMigration().unwrap();
      const deleted = Object.entries(result.deleted || {})
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ');
      message.success(`Rollback done. Deleted — ${deleted}`, 10);
    } catch {
      message.error('Rollback failed');
    }
  };

  const [importAgreements, { isLoading: isImporting }] =
    useImportAgreementsMutation();
  const [rollbackAgreements, { isLoading: isRollingBackAgreements }] =
    useRollbackImportedAgreementsMutation();
  const [importResult, setImportResult] =
    useState<ImportAgreementsResponse | null>(null);

  const handleImportAgreements = async (file: File) => {
    try {
      const result = await importAgreements(file).unwrap();
      setImportResult(result);
    } catch {
      message.error('Goşmaça şertnamalary ýüklemek başartmady');
    }
  };

  const handleRollbackAgreements = async () => {
    try {
      const result = await rollbackAgreements().unwrap();
      message.success(`Pozuldy: ${result.deleted} goşmaça şertnama`, 8);
    } catch {
      message.error('Rollback failed');
    }
  };

  const problemColumns = [
    { title: 'CSV t_b', dataIndex: 't_b', key: 't_b', width: 90 },
    { title: 'Paýçy', dataIndex: 'paychy', key: 'paychy' },
    {
      title: 'Reýestrler',
      dataIndex: 'registry_ids',
      key: 'registry_ids',
      width: 140,
      render: (ids?: number[]) => (ids ? ids.join(', ') : '-'),
    },
  ];

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
  const hasOtkazText = (record: { ady_paychy_alan?: string }) => {
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
          <Space
            style={{ width: '100%', justifyContent: 'space-between' }}
            align='start'
          >
            <div>
              <Title level={2}>Old Registries</Title>
              <p>Legacy data migrated from MySQL database</p>
            </div>
            <Space>
              <Popconfirm
                title='Täze reýestre geçirmek'
                description='Ähli öňki reýestr maglumatlary täze reýestre geçirilsinmi? Öň geçirilenler gaýtalanmaz.'
                onConfirm={handleMigrate}
                okText='Hawa'
                cancelText='Ýok'
              >
                <Button
                  type='primary'
                  icon={<SwapOutlined />}
                  loading={isMigrating}
                >
                  Täze reýestre geçir
                </Button>
              </Popconfirm>
              <Popconfirm
                title='Geçirilen maglumatlary yzyna almak'
                description='Öňki reýestrden geçirilen ähli ýazgylar täze reýestrden pozulsynmy? El bilen girizilen maglumatlara degilmez.'
                onConfirm={handleRollback}
                okText='Hawa'
                cancelText='Ýok'
                okButtonProps={{ danger: true }}
              >
                <Button danger icon={<UndoOutlined />} loading={isRollingBack}>
                  Yzyna al
                </Button>
              </Popconfirm>
              <Upload
                accept='.csv'
                showUploadList={false}
                beforeUpload={(file) => {
                  handleImportAgreements(file);
                  return false;
                }}
              >
                <Button icon={<UploadOutlined />} loading={isImporting}>
                  Goşmaça şertnamalary ýükle (CSV)
                </Button>
              </Upload>
              <Popconfirm
                title='Ýüklenen goşmaça şertnamalary pozmak'
                description='CSV-den ýüklenen ähli goşmaça şertnamalar pozulsynmy? El bilen girizilenlere degilmez.'
                onConfirm={handleRollbackAgreements}
                okText='Hawa'
                cancelText='Ýok'
                okButtonProps={{ danger: true }}
              >
                <Button
                  danger
                  icon={<UndoOutlined />}
                  loading={isRollingBackAgreements}
                >
                  Şertnamalary poz
                </Button>
              </Popconfirm>
            </Space>
          </Space>
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
              <InfoCircleOutlined style={{ color: '#cf1322' }} />
              <Text type='secondary'>
                <Tag color='red' style={{ margin: 0 }}>Reňkli setirler</Tag>
                - OTKAZ (çep tarapynda gyzyl çyzyk)
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
              style: { cursor: 'pointer' },
            })}
            rowClassName={(record) => hasOtkazText(record) ? 'otkaz-row' : ''}
            scroll={{ x: 1200 }}
            size='small'
          />
        </Spin>
      </Card>

      <Modal
        title='Goşmaça şertnamalary ýüklemegiň netijesi'
        open={!!importResult}
        onCancel={() => setImportResult(null)}
        footer={
          <Button type='primary' onClick={() => setImportResult(null)}>
            Ýap
          </Button>
        }
        width={800}
      >
        {importResult && (
          <Space direction='vertical' style={{ width: '100%' }} size={16}>
            <Descriptions bordered size='small' column={2}>
              <Descriptions.Item label='Jemi'>
                {importResult.total}
              </Descriptions.Item>
              <Descriptions.Item label='Ýüklendi'>
                {importResult.imported}
              </Descriptions.Item>
              <Descriptions.Item label='Öň ýüklenen (geçirildi)'>
                {importResult.skipped_existing}
              </Descriptions.Item>
              <Descriptions.Item label='Tapylmady / köp gabat gelen'>
                {(importResult.unmatched?.length || 0) +
                  (importResult.ambiguous?.length || 0)}
              </Descriptions.Item>
            </Descriptions>
            {!!importResult.unmatched?.length && (
              <>
                <Text strong>
                  Reýestri tapylmadyk paýçylar (
                  {importResult.unmatched.length})
                </Text>
                <Table
                  columns={problemColumns}
                  dataSource={importResult.unmatched}
                  rowKey='t_b'
                  size='small'
                  pagination={{ pageSize: 5 }}
                />
              </>
            )}
            {!!importResult.ambiguous?.length && (
              <>
                <Text strong>
                  Birnäçe reýestre gabat gelenler (
                  {importResult.ambiguous.length})
                </Text>
                <Table
                  columns={problemColumns}
                  dataSource={importResult.ambiguous}
                  rowKey='t_b'
                  size='small'
                  pagination={{ pageSize: 5 }}
                />
              </>
            )}
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default OldRegistries;
