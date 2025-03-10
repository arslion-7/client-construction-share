import { EditOutlined } from '@ant-design/icons';
import SelectButton from '../button/SelectButton';

import { Button, type TableProps } from 'antd';
import { useNavigate } from 'react-router';
import { useGetRegistryQuery } from '@/features/registries/registriesApiSlice';
interface Props {
  isLoadingSelect: boolean;
  onSelectClicked: (id: number) => void;
  registryId?: string | number;
  selectedId:
    | 'building_id'
    | 'general_contractor_id'
    | 'sub_contractor_id'
    | 'builder_id'
    | 'receiver_id'
    | 'shareholder_id';
}

export function useSufColumns({
  isLoadingSelect,
  onSelectClicked,
  registryId,
  selectedId,
}: Props) {
  let sufColumns: TableProps['columns'] = [];

  const { data: registry, isLoading: isLoadingRegistry } = useGetRegistryQuery(
    registryId ? registryId.toString() : '0',
    { skip: !registryId }
  );

  console.log('registry in useSufColumns', registry);

  if (registryId)
    sufColumns = [
      {
        title: 'Saýla',
        dataIndex: 'select',
        key: 'select',
        render: (_, record) => {
          if (isLoadingRegistry || !registry) return <></>;
          return (
            <SelectButton
              loading={isLoadingSelect}
              onClick={() => onSelectClicked(record.id)}
              selected={registry[selectedId] === record.id}
            />
          );
        },
      },
    ];

  return { sufColumns };
}

export function useEditColumns() {
  const navigate = useNavigate();

  let editColumns: TableProps<{ id: number; edit: string }>['columns'] = [];

  editColumns = [
    {
      title: 'Hereket',
      dataIndex: 'edit',
      key: 'edit',
      render: (_, record) => (
        <Button
          shape='circle'
          icon={<EditOutlined />}
          onClick={() => {
            navigate(record.id.toString());
          }}
        />
      ),
    },
  ];

  return {
    editColumns,
  };
}
