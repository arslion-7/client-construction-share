import { IRegistry } from '@/features/registries/types';
import { Button, Table, Typography } from 'antd';
import { useNavigate } from 'react-router';
import type { TableProps } from 'antd';

interface IRegistryMainProps {
  registry: IRegistry;
}

interface DataType {
  key: string;
  selected: string;
  select: string;
  address: string;
  // tags: string[];
}

export default function RegistryMain({ registry }: IRegistryMainProps) {
  const navigate = useNavigate();

  const dataSource: DataType[] = [
    {
      key: 'general_contractors',
      selected: 'Baş potratçy',
      select: 'Baş potratçy',
      address: '10 Downing Street',
    },
    {
      key: 'sub_contractors',
      selected: 'Kömekçi potratçy',
      select: 'Kömekçi potratçy',
      address: '10 Downing Street',
    },
  ];

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Saýlanan',
      dataIndex: 'selected',
      key: 'selected',
      render: (text) => {
        let data = '';
        switch (text) {
          case 'Baş potratçy':
            data = registry.general_contractor.org_name;
            break;

          default:
            break;
        }

        return <Typography.Text strong>{data}</Typography.Text>;
      },
    },
    {
      title: 'Saýla',
      dataIndex: 'select',
      key: 'select',
      render: (text: string, record: DataType) => (
        <Button
          onClick={() => navigate(`/${record.key}?registryId=${registry.id}`)}
        >
          {text} - saýla
        </Button>
      ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
}
