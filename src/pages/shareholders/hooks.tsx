import React from 'react';
import { type TableProps, Button } from 'antd';
import { useNavigate } from 'react-router';
import { usePaginationSearch } from '@/utils/hooks/paramsHooks';
import { useMessageApi } from '@/utils/messages';
import { useEditColumns, useSufColumns } from '@/components/table/columns';
import { useSelectShareholderMutation } from '@/features/registries/registriesApiSlice';
import { IShareholder } from '@/features/shareholders/types';
import { UndefinedTag } from '@/components/table/UndefinedTag';

// Component for expandable text
const ExpandableText: React.FC<{ text: string; maxLength?: number }> = ({
  text,
  maxLength = 60,
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
  const { registryId } = usePaginationSearch();
  const { messageApi } = useMessageApi();

  const [select, { isLoading: isLoadingSelect }] =
    useSelectShareholderMutation();

  const onSelectClicked = async (id: number) => {
    await select({
      id: registryId.toString(),
      shareholder_id: id,
    });
    messageApi.success('Paýçy saýlandy');
    navigate(`/registries/${registryId}?tab=choices`);
  };

  const { sufColumns } = useSufColumns({
    isLoadingSelect,
    onSelectClicked,
    registryId,
    selectedId: 'shareholder_id',
  });

  const { editColumns } = useEditColumns();

  const preColumns: TableProps<IShareholder>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: 'Tertip belgisi',
      dataIndex: 't_b',
      key: 't_b',
      width: 100,
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
      width: 200,
      render: (_, record) => (
        <ExpandableText text={record.org_name || ''} maxLength={50} />
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
        return <ExpandableText text={fullAddress || ''} maxLength={50} />;
      },
    },
    {
      title: 'Telefonlar',
      key: 'phones',
      width: 150,
      render: (_, record) => {
        if (!record.phones || record.phones.length === 0) {
          return <UndefinedTag />;
        }
        return (
          <div>
            {record.phones.slice(0, 2).map((phone, index) => (
              <div
                key={index}
                style={{ fontSize: '12px', marginBottom: '2px' }}
              >
                {phone.kind}: {phone.number}
              </div>
            ))}
            {record.phones.length > 2 && (
              <span style={{ fontSize: '11px' }}>
                +{record.phones.length - 2} more
              </span>
            )}
          </div>
        );
      },
    },
    {
      title: 'Resminamalar',
      key: 'docs',
      width: 200,
      render: (_, record) => {
        const docsInfo = [];
        if (record.passport_series && record.passport_number) {
          docsInfo.push(
            `Pasport: ${record.passport_series} ${record.passport_number}`
          );
        }
        if (record.patent_series && record.patent_number) {
          docsInfo.push(
            `Patent: ${record.patent_series} ${record.patent_number}`
          );
        }
        if (record.cert_number) {
          docsInfo.push(`Sertifikat: ${record.cert_number}`);
        }
        if (record.docs_additional_info) {
          docsInfo.push(`Goşmaça: ${record.docs_additional_info}`);
        }
        const docsText = docsInfo.join('\n');
        return <ExpandableText text={docsText || ''} maxLength={50} />;
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
        />
      ),
    },
  ];

  return [...preColumns, ...editColumns, ...sufColumns];
}
