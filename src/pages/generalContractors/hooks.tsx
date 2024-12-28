import { IContractor } from '@/features/generalContractors/types';
import { Button, type TableProps } from 'antd';
import { CheckCircleOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { usePaginationSearch } from '@/utils/hooks/paramsHooks';
import { useSelectGeneralContractorMutation } from '@/features/registries/registriesApiSlice';

export function useColumns() {
  const navigate = useNavigate();
  const { registryId } = usePaginationSearch();

  const [select, { isLoading: isLoadingSelect }] =
    useSelectGeneralContractorMutation();

  const preColumns: TableProps<IContractor>['columns'] = [
    {
      title: 't_b',
      dataIndex: 't_b',
      key: 't_b'
    },
    {
      title: 'org_name',
      dataIndex: 'org_name',
      key: 'org_name'
    },
    {
      title: 'edit',
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
      )
    }
  ];

  let sufColumns: TableProps<IContractor>['columns'] = [];

  if (registryId) {
    sufColumns = [
      {
        title: 'Saýla',
        dataIndex: 'select',
        key: 'select',
        render: (_, record) => (
          <Button
            loading={isLoadingSelect}
            onClick={async () => {
              await select({
                id: registryId.toString(),
                general_contractor_id: record.id
              });
              navigate(`/registries/${registryId}`);
            }}
            icon={<CheckCircleOutlined />}
          >
            Saýla
          </Button>
        )
      }
    ];
  }

  return [...preColumns, ...sufColumns];
}
