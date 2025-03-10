import { type TableProps } from 'antd';
import { useNavigate } from 'react-router';
import { usePaginationSearch } from '@/utils/hooks/paramsHooks';
import { useMessageApi } from '@/utils/messages';
import { useEditColumns, useSufColumns } from '@/components/table/columns';
import { useSelectBuilderMutation } from '@/features/registries/registriesApiSlice';
import { IShareholder } from '@/features/shareholders/types';

export function useColumns() {
  const navigate = useNavigate();
  const { registryId } = usePaginationSearch();
  const { messageApi } = useMessageApi();

  const [select, { isLoading: isLoadingSelect }] = useSelectBuilderMutation();

  const onSelectClicked = async (id: number) => {
    await select({
      id: registryId.toString(),
      builder_id: id,
    });
    messageApi.success('Paýçy saýlandy');
    navigate(`/shareholders/${registryId}`);
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
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 't_b',
      dataIndex: 't_b',
      key: 't_b',
    },
  ];

  return [...preColumns, ...editColumns, ...sufColumns];
}
