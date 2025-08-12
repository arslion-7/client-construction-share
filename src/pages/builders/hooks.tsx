import React from 'react';
import { type TableProps } from 'antd';
import { useNavigate } from 'react-router';
import { usePaginationSearch } from '@/utils/hooks/paramsHooks';
import { useMessageApi } from '@/utils/messages';
import { IBuilder } from '@/features/builders/types';
import { useEditColumns, useSufColumns } from '@/components/table/columns';
import { useSelectBuilderMutation } from '@/features/registries/registriesApiSlice';
import { UndefinedTag } from '@/components/table/UndefinedTag';

// Component for expandable text
const ExpandableText: React.FC<{
  text: string;
  maxLength?: number;
  isRowExpanded?: boolean;
}> = ({ text, maxLength = 60, isRowExpanded = false }) => {
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

export function useColumns() {
  const navigate = useNavigate();
  const { registryId } = usePaginationSearch();
  const { messageApi } = useMessageApi();
  const [expandedRows, setExpandedRows] = React.useState<
    Record<number, boolean>
  >({});

  const [select, { isLoading: isLoadingSelect }] = useSelectBuilderMutation();

  const onSelectClicked = async (id: number) => {
    await select({
      id: registryId.toString(),
      builder_id: id,
    });
    messageApi.success('Gurujy saýlandy');
    navigate(`/registries/${registryId}?tab=choices`);
  };

  const { sufColumns } = useSufColumns({
    isLoadingSelect,
    onSelectClicked,
    registryId,
    selectedId: 'builder_id',
  });

  const { editColumns } = useEditColumns();

  const preColumns: TableProps<IBuilder>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: 'Gurama görnüşi',
      key: 'org_type',
      width: 120,
      render: (_, record) => <span>{record.org_type || <UndefinedTag />}</span>,
    },
    {
      title: 'Guramanyň ady',
      key: 'org_name',
      width: 250,
      render: (_, record) => (
        <ExpandableText
          text={record.org_name || ''}
          maxLength={50}
          isRowExpanded={expandedRows[record.id] || false}
        />
      ),
    },
    {
      title: 'Ýolbaşçy',
      key: 'head_full_name',
      width: 150,
      render: (_, record) => (
        <span>{record.head_full_name || <UndefinedTag />}</span>
      ),
    },
    {
      title: 'Wezipesi',
      key: 'head_position',
      width: 120,
      render: (_, record) => (
        <span>{record.head_position || <UndefinedTag />}</span>
      ),
    },
    {
      title: 'Adres',
      key: 'address',
      width: 200,
      render: (_, record) => {
        const addressParts = [];
        if (record.areas && record.areas.length > 0) {
          addressParts.push(record.areas.map((area) => area.name).join(', '));
        }
        if (record.address) {
          addressParts.push(record.address);
        }
        const fullAddress = addressParts.join(' | ');
        return (
          <ExpandableText
            text={fullAddress || ''}
            maxLength={50}
            isRowExpanded={expandedRows[record.id] || false}
          />
        );
      },
    },
    {
      title: 'Goşmaça maglumat',
      key: 'org_additional_info',
      width: 200,
      render: (_, record) => (
        <ExpandableText
          text={record.org_additional_info || ''}
          maxLength={50}
          isRowExpanded={expandedRows[record.id] || false}
        />
      ),
    },
  ];

  return {
    columns: [...preColumns, ...editColumns, ...sufColumns],
    expandedRows,
    setExpandedRows,
  };
}
