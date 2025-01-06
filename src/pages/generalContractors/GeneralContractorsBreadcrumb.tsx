import GeneralBreadCrumb from '@/components/GeneralBreadCrumb';
import { PATHS } from '@/routes/paths';

export default function GeneralContractorsBreadcrumb({
  withLeftArrow,
  withId
}: {
  withLeftArrow?: boolean;
  withId?: boolean;
}) {
  const items = [
    {
      href: PATHS.GENERAL_CONTRACTORS,
      title: 'Baş potratçylar'
    }
  ];

  return (
    <GeneralBreadCrumb
      withLeftArrow={withLeftArrow}
      items={[...items]}
      withId={withId}
    />
  );
}
