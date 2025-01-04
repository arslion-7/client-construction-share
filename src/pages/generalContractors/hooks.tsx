import { IContractor } from '@/features/generalContractors/types';
import { type TableProps } from 'antd';
import { useNavigate } from 'react-router';
import { usePaginationSearch } from '@/utils/hooks/paramsHooks';
import { useSelectGeneralContractorMutation } from '@/features/registries/registriesApiSlice';
import { useMessageApi } from '@/utils/messages';
import { useEditColumns, useSufColumns } from '@/components/table/columns';

export function useColumns() {
  const navigate = useNavigate();
  const { registryId } = usePaginationSearch();

  const { messageApi } = useMessageApi();

  const [select, { isLoading: isLoadingSelect }] =
    useSelectGeneralContractorMutation();

  const onSelectClicked = async (id: number) => {
    await select({
      id: registryId.toString(),
      general_contractor_id: id
    });
    messageApi.success('Baş potratçy saýlandy');
    navigate(`/registries/${registryId}`);
  };

  const { sufColumns } = useSufColumns({
    isLoadingSelect,
    onSelectClicked,
    registryId,
    selectedId: 'general_contractor_id'
  });

  const { editColumns } = useEditColumns();

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
    }
  ];

  return [...preColumns, ...editColumns, ...sufColumns];
}
