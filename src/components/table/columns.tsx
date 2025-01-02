import { EditOutlined } from '@ant-design/icons';
import SelectButton from '../button/SelectButton';

import { Button, type TableProps } from 'antd';
import { useNavigate } from 'react-router';
interface Props {
  isLoadingSelect: boolean;
  onSelectClicked: (id: number) => void;
  registryId: string | number;
}

export function useSufColumns({
  isLoadingSelect,
  onSelectClicked,
  registryId,
}: Props) {
  let sufColumns: TableProps<{ id: number }>['columns'] = [];

  if (registryId)
    sufColumns = [
      {
        title: 'Saýla',
        dataIndex: 'select',
        key: 'select',
        render: (_, record) => (
          <SelectButton
            loading={isLoadingSelect}
            onClick={() => onSelectClicked(record.id)}
          />
        ),
      },
    ];

  return { sufColumns };
}

export function useEditColumns() {
  const navigate = useNavigate();

  let editColumns: TableProps<{ id: number }>['columns'] = [];

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
