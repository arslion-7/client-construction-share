import React from 'react';
import { type TableProps, Button } from 'antd';
import { useNavigate } from 'react-router';
import { usePaginationSearch } from '@/utils/hooks/paramsHooks';
import { useSelectBuildingMutation } from '@/features/registries/registriesApiSlice';
import { useMessageApi } from '@/utils/messages';
import { IBuilding } from '@/features/buildings/types';
import { useEditColumns, useSufColumns } from '@/components/table/columns';
import { UndefinedTag } from '@/components/table/UndefinedTag';
import dayjs from 'dayjs';

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

  const [select, { isLoading: isLoadingSelect }] = useSelectBuildingMutation();

  const onSelectClicked = async (id: number) => {
    await select({
      id: registryId.toString(),
      building_id: id,
    });
    messageApi.success('Desga saýlandy');
    navigate(`/registries/${registryId}?tab=choices`);
  };

  const { sufColumns } = useSufColumns({
    isLoadingSelect,
    onSelectClicked,
    registryId,
    selectedId: 'building_id',
  });

  const { editColumns } = useEditColumns();

  const preColumns: TableProps<IBuilding>['columns'] = [
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
      title: 'Desga belgisi',
      key: 'ident_number',
      width: 120,
      render: (_, record) => (
        <span>{record.ident_number || <UndefinedTag />}</span>
      ),
    },
    {
      title: 'Desga görnüşi',
      key: 'kind',
      width: 120,
      render: (_, record) => <span>{record.kind || <UndefinedTag />}</span>,
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
        if (record.street) {
          addressParts.push(record.street);
        }
        const fullAddress = addressParts.join(' | ');
        return <ExpandableText text={fullAddress || ''} maxLength={50} />;
      },
    },
    {
      title: 'Bahasy',
      key: 'price',
      width: 100,
      render: (_, record) => (
        <span>{record.price ? `${record.price} man.` : <UndefinedTag />}</span>
      ),
    },
    {
      title: 'Göterimi',
      key: 'percentage',
      width: 80,
      render: (_, record) => (
        <span>
          {record.percentage ? `${record.percentage}%` : <UndefinedTag />}
        </span>
      ),
    },
    {
      title: 'Karar',
      key: 'order_info',
      width: 200,
      render: (_, record) => {
        const orderInfo = [];
        if (record.order_whose_what) {
          orderInfo.push(`Näme: ${record.order_whose_what}`);
        }
        if (record.order_code) {
          orderInfo.push(`Belgisi: ${record.order_code}`);
        }
        if (record.order_date) {
          const orderDate =
            typeof record.order_date === 'string'
              ? dayjs(record.order_date)
              : record.order_date;
          orderInfo.push(`Senesi: ${orderDate.format('DD.MM.YYYY')}`);
        }
        if (record.order_additional_info) {
          orderInfo.push(`Goşmaça: ${record.order_additional_info}`);
        }
        const orderText = orderInfo.join('\n');
        return <ExpandableText text={orderText || ''} maxLength={50} />;
      },
    },
    {
      title: 'Meýdanlar',
      key: 'squares',
      width: 150,
      render: (_, record) => {
        const squareInfo = [];
        if (record.square_1 && record.square_1_name) {
          squareInfo.push(`${record.square_1_name}: ${record.square_1}m²`);
        }
        if (record.square_2 && record.square_2_name) {
          squareInfo.push(`${record.square_2_name}: ${record.square_2}m²`);
        }
        if (record.square_3 && record.square_3_name) {
          squareInfo.push(`${record.square_3_name}: ${record.square_3}m²`);
        }
        if (record.square_additional_info) {
          squareInfo.push(`Goşmaça: ${record.square_additional_info}`);
        }
        const squareText = squareInfo.join('\n');
        return <ExpandableText text={squareText || ''} maxLength={50} />;
      },
    },
    {
      title: 'Sertifikatlar',
      key: 'certs',
      width: 150,
      render: (_, record) => {
        const certInfo = [];
        if (record.cert_name) {
          certInfo.push(`Ady: ${record.cert_name}`);
        }
        if (record.cert_1_code) {
          certInfo.push(`1-nji: ${record.cert_1_code}`);
        }
        if (record.cert_2_code) {
          certInfo.push(`2-nji: ${record.cert_2_code}`);
        }
        const certText = certInfo.join('\n');
        return <ExpandableText text={certText || ''} maxLength={50} />;
      },
    },
  ];

  return [...preColumns, ...editColumns, ...sufColumns];
}
