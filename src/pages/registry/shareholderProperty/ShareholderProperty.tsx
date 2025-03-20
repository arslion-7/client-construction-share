import { useGetShareholderPropertyQuery } from '@/features/shareholderProperties/shareholderPropertiesApiSlice';
import { useIsNew } from '@/utils/hooks/paramsHooks';
import { Skeleton } from 'antd';
import ShareholderPropertyForm from './ShareholderPropertyForm';

export default function ShareholderProperty() {
  const { id } = useIsNew();
  // const { messageApi } = useMessageApi();

  const { data: shareholderProperty, isLoading } =
    useGetShareholderPropertyQuery({
      registryId: id!,
    });

  if (isLoading) return <Skeleton />;

  return <ShareholderPropertyForm shareholderProperty={shareholderProperty} />;
}
