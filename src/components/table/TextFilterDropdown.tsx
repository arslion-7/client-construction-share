import { Button, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { FilterDropdownProps } from 'antd/es/table/interface';

// Text-search dropdown for server-side column filtering
export function getTextFilterDropdown(placeholder: string) {
  return function TextFilterDropdown({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }: FilterDropdownProps) {
    return (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          placeholder={placeholder}
          value={selectedKeys[0] as string}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: 'block', width: 240 }}
          allowClear
        />
        <Space>
          <Button
            type='primary'
            size='small'
            icon={<SearchOutlined />}
            onClick={() => confirm()}
          >
            Gözle
          </Button>
          <Button
            size='small'
            onClick={() => {
              clearFilters?.();
              confirm();
            }}
          >
            Arassala
          </Button>
        </Space>
      </div>
    );
  };
}

export function getFilterIcon(active: boolean) {
  return <SearchOutlined style={active ? { color: '#1677ff' } : undefined} />;
}
