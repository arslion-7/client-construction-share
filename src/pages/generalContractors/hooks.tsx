import React from 'react';
import dayjs from 'dayjs';
import { IContractor } from '@/features/generalContractors/types';
import { type TableProps, Button } from 'antd';
import { useNavigate } from 'react-router';
import { usePaginationSearch } from '@/utils/hooks/paramsHooks';
import { useSelectGeneralContractorMutation } from '@/features/registries/registriesApiSlice';
import { useMessageApi } from '@/utils/messages';
import { useEditColumns, useSufColumns } from '@/components/table/columns';
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
    useSelectGeneralContractorMutation();

  const onSelectClicked = async (id: number) => {
    await select({
      id: registryId.toString(),
      general_contractor_id: id,
    });
    messageApi.success('Baş potratçy saýlandy');
    navigate(`/registries/${registryId}?tab=choices`);
  };

  const { sufColumns } = useSufColumns({
    isLoadingSelect,
    onSelectClicked,
    registryId,
    selectedId: 'general_contractor_id',
  });

  const { editColumns } = useEditColumns();

  const preColumns: TableProps<IContractor>['columns'] = [
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
      width: 250,
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
      title: 'Sertifikat',
      key: 'cert',
      width: 150,
      render: (_, record) => {
        const certInfo = [];
        if (record.cert_number) {
          certInfo.push(`Belgisi: ${record.cert_number}`);
        }
        if (record.cert_date) {
          const certDate =
            typeof record.cert_date === 'string'
              ? dayjs(record.cert_date)
              : record.cert_date;
          certInfo.push(`Senesi: ${certDate.format('DD.MM.YYYY')}`);
        }
        const certText = certInfo.join('\n');
        return <ExpandableText text={certText || ''} maxLength={50} />;
      },
    },
    {
      title: 'Ygtyýarnama',
      key: 'resolution',
      width: 200,
      render: (_, record) => {
        const resolutionInfo = [];
        if (record.resolution_code) {
          resolutionInfo.push(`Belgisi: ${record.resolution_code}`);
        }
        if (record.resolution_begin_date) {
          const beginDate =
            typeof record.resolution_begin_date === 'string'
              ? dayjs(record.resolution_begin_date)
              : record.resolution_begin_date;
          resolutionInfo.push(`Başy: ${beginDate.format('DD.MM.YYYY')}`);
        }
        if (record.resolution_end_date) {
          const endDate =
            typeof record.resolution_end_date === 'string'
              ? dayjs(record.resolution_end_date)
              : record.resolution_end_date;
          resolutionInfo.push(`Soňy: ${endDate.format('DD.MM.YYYY')}`);
        }
        const resolutionText = resolutionInfo.join('\n');
        return <ExpandableText text={resolutionText || ''} maxLength={50} />;
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
