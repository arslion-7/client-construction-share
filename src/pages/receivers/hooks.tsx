import { type TableProps } from 'antd';
import { useNavigate } from 'react-router';
import { usePaginationSearch } from '@/utils/hooks/paramsHooks';
import { useSelectReceiverMutation } from '@/features/registries/registriesApiSlice';
import { useMessageApi } from '@/utils/messages';
import { IReceiver } from '@/features/receivers/types';
import { useEditColumns, useSufColumns } from '@/components/table/columns';

export function useColumns() {
  const navigate = useNavigate();
  const { registryId } = usePaginationSearch();
  const { messageApi } = useMessageApi();

  const [select, { isLoading: isLoadingSelect }] = useSelectReceiverMutation(); // TODO

  const onSelectClicked = async (id: number) => {
    await select({
      id: registryId.toString(),
      receiver_id: id
    });
    messageApi.success('Almaga gelen saýlandy');
    navigate(`/registries/${registryId}`);
  };

  const { sufColumns } = useSufColumns({
    isLoadingSelect,
    onSelectClicked,
    registryId,
    selectedId: 'receiver_id'
  });

  const { editColumns } = useEditColumns();

  const preColumns: TableProps<IReceiver>['columns'] = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 't_b',
      dataIndex: 't_b',
      key: 't_b'
    },
    {
      title: 'citizen_status',
      dataIndex: 'citizen_status',
      key: 'citizen_status'
    },
    {
      title: 'department',
      dataIndex: 'department',
      key: 'department'
    },
    {
      title: 'position',
      dataIndex: 'position',
      key: 'position'
    },
    {
      title: 'firstname',
      dataIndex: 'firstname',
      key: 'firstname'
    },
    {
      title: 'lastname',
      dataIndex: 'lastname',
      key: 'lastname'
    },
    {
      title: 'patronymic',
      dataIndex: 'patronymic',
      key: 'patronymic'
    },
    {
      title: 'additional_info',
      dataIndex: 'additional_info',
      key: 'additional_info'
    }
  ];

  return [...preColumns, ...editColumns, ...sufColumns];
}
