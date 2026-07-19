import React from 'react';
import { Button, type TableProps } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { IRegistry, IRegistryFilterOptions } from '@/features/registries/types';
import { UndefinedTag } from '@/components/table/UndefinedTag';
import {
  getTextFilterDropdown,
  getFilterIcon,
} from '@/components/table/TextFilterDropdown';

// Current server-side column filter values (from the URL)
export interface IRegistryColumnFilters {
  t_b: string;
  gc_ids: string[];
  user_ids: string[];
  shareholder_q: string;
  builder_q: string;
  building_q: string;
}

// Component for expandable text with row expand state
const ExpandableText: React.FC<{
  text: string;
  maxLength?: number;
  isRowExpanded?: boolean;
}> = ({ text, maxLength = 80, isRowExpanded = false }) => {
  if (!text) return <UndefinedTag />;

  // Convert newlines to HTML line breaks and make values bold
  const formatText = (text: string) => {
    return text.split('\n').map((line, index) => {
      // Split by colon to separate field name and value
      const parts = line.split(': ');
      if (parts.length === 2) {
        return (
          <React.Fragment key={index}>
            {parts[0]}: <strong>{parts[1]}</strong>
            {index < text.split('\n').length - 1 && <br />}
          </React.Fragment>
        );
      }
      return (
        <React.Fragment key={index}>
          {line}
          {index < text.split('\n').length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  if (text.length <= maxLength) {
    return <span>{formatText(text)}</span>;
  }

  return (
    <span>
      {isRowExpanded ? formatText(text) : `${text.slice(0, maxLength)}...`}
    </span>
  );
};

export function useColumns({
  filterOptions,
  filterValues,
}: {
  filterOptions?: IRegistryFilterOptions;
  filterValues: IRegistryColumnFilters;
}) {
  const navigate = useNavigate();
  const [expandedRows, setExpandedRows] = React.useState<
    Record<number, boolean>
  >({});

  const columns: TableProps<IRegistry>['columns'] = [
    // {
    //   title: 'id',
    //   dataIndex: 'id',
    //   key: 'id',
    // },
    {
      title: 'PGGŞ №',
      dataIndex: 't_b',
      key: 't_b',
      filterDropdown: getTextFilterDropdown('PGGŞ №'),
      filterIcon: getFilterIcon(!!filterValues.t_b),
      filteredValue: filterValues.t_b ? [filterValues.t_b] : null,
    },
    {
      title: 'Hereket',
      dataIndex: 'edit_start',
      key: 'edit_start',
      width: 80,
      render: (_, record) => (
        <Button
          shape='circle'
          icon={<EditOutlined />}
          onClick={(e) => {
            e.stopPropagation(); // Prevent row click
            navigate(record.id.toString());
          }}
        />
      ),
    },
    {
      title: 'Baş potratçy',
      key: 'general_contractor',
      filters: (filterOptions?.general_contractors || []).map((o) => ({
        text: o.name || `#${o.id}`,
        value: o.id,
      })),
      filterSearch: true,
      filteredValue: filterValues.gc_ids.length
        ? filterValues.gc_ids.map(Number)
        : null,
      render: (_, record) => (
        <>
          {record.general_contractor ? (
            record.general_contractor.org_name
          ) : (
            <UndefinedTag />
          )}
        </>
      ),
    },
    {
      title: 'Ulanyjy',
      key: 'user',
      filters: (filterOptions?.users || []).map((o) => ({
        text: o.name || `#${o.id}`,
        value: o.id,
      })),
      filterSearch: true,
      filteredValue: filterValues.user_ids.length
        ? filterValues.user_ids.map(Number)
        : null,
      render: (_, record) => (
        <>{record.user ? record.user.email : <UndefinedTag />}</>
      ),
    },
    {
      title: 'Paýçy maglumaty',
      key: 'shareholder_description',
      filterDropdown: getTextFilterDropdown('Paýçy boýunça gözle'),
      filterIcon: getFilterIcon(!!filterValues.shareholder_q),
      filteredValue: filterValues.shareholder_q
        ? [filterValues.shareholder_q]
        : null,
      render: (_, record) => (
        <ExpandableText
          text={record.shareholder_description || ''}
          isRowExpanded={expandedRows[record.id] || false}
        />
      ),
    },
    {
      title: 'Baş potratçy maglumaty',
      key: 'general_contractor_description',
      render: (_, record) => (
        <ExpandableText
          text={record.general_contractor_description || ''}
          isRowExpanded={expandedRows[record.id] || false}
        />
      ),
    },
    {
      title: 'Desga maglumaty',
      key: 'building_description',
      filterDropdown: getTextFilterDropdown('Desga boýunça gözle'),
      filterIcon: getFilterIcon(!!filterValues.building_q),
      filteredValue: filterValues.building_q
        ? [filterValues.building_q]
        : null,
      render: (_, record) => (
        <ExpandableText
          text={record.building_description || ''}
          isRowExpanded={expandedRows[record.id] || false}
        />
      ),
    },
    {
      title: 'Gurujy maglumaty',
      key: 'builder_description',
      filterDropdown: getTextFilterDropdown('Gurujy boýunça gözle'),
      filterIcon: getFilterIcon(!!filterValues.builder_q),
      filteredValue: filterValues.builder_q ? [filterValues.builder_q] : null,
      render: (_, record) => (
        <ExpandableText
          text={record.builder_description || ''}
          isRowExpanded={expandedRows[record.id] || false}
        />
      ),
    },
    {
      title: 'Hereket',
      dataIndex: 'edit_end',
      key: 'edit_end',
      width: 80,
      render: (_, record) => (
        <Button
          shape='circle'
          icon={<EditOutlined />}
          onClick={(e) => {
            e.stopPropagation(); // Prevent row click
            navigate(record.id.toString());
          }}
        />
      ),
    },
  ];

  return {
    columns,
    expandedRows,
    setExpandedRows,
  };
}
