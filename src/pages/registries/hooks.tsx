import React from 'react';
import { Button, type TableProps } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { IRegistry } from '@/features/registries/types';
import { UndefinedTag } from '@/components/table/UndefinedTag';

// Component for expandable text
const ExpandableText: React.FC<{ text: string; maxLength?: number }> = ({
  text,
  maxLength = 80,
}) => {
  const [expanded, setExpanded] = React.useState(false);

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
      {expanded ? formatText(text) : `${text.slice(0, maxLength)}...`}
      <Button
        type='link'
        size='small'
        onClick={() => setExpanded(!expanded)}
        style={{ padding: '0 4px', height: 'auto' }}
      >
        {expanded ? 'Gizle' : 'Giňelt'}
      </Button>
    </span>
  );
};

export function useColumns() {
  const navigate = useNavigate();

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
    },
    {
      title: 'Baş potratçy',
      key: 'general_contractor',
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
      render: (_, record) => (
        <>{record.user ? record.user.email : <UndefinedTag />}</>
      ),
    },
    {
      title: 'Paýçy maglumaty',
      key: 'shareholder_description',
      render: (_, record) => (
        <ExpandableText text={record.shareholder_description || ''} />
      ),
    },
    {
      title: 'Baş potratçy maglumaty',
      key: 'general_contractor_description',
      render: (_, record) => (
        <ExpandableText text={record.general_contractor_description || ''} />
      ),
    },
    {
      title: 'Desga maglumaty',
      key: 'building_description',
      render: (_, record) => (
        <ExpandableText text={record.building_description || ''} />
      ),
    },
    {
      title: 'Gurujy maglumaty',
      key: 'builder_description',
      render: (_, record) => (
        <ExpandableText text={record.builder_description || ''} />
      ),
    },
    {
      title: 'Hekeket',
      dataIndex: 'edit',
      key: 'edit',
      render: (_, record) => (
        <Button
          shape='circle'
          icon={<EditOutlined />}
          onClick={() => {
            console.log('clicked', record.id);
            navigate(record.id.toString());
          }}
        />
      ),
    },
  ];

  return columns;
}
