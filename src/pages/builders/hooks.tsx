import { type TableProps } from 'antd';
import { useNavigate } from 'react-router';
import { usePaginationSearch } from '@/utils/hooks/paramsHooks';
import { useMessageApi } from '@/utils/messages';
import { IBuilder } from '@/features/builders/types';
import { useEditColumns, useSufColumns } from '@/components/table/columns';
import { useSelectBuilderMutation } from '@/features/registries/registriesApiSlice';

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
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Guramanyň ady',
      dataIndex: 'org_name',
      key: 'org_name',
    },
  ];

  return [...preColumns, ...editColumns, ...sufColumns];
}
