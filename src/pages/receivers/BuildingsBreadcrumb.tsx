import GeneralBreadCrumb from '@/components/GeneralBreadCrumb';
import { PATHS } from '@/routes/paths';

export default function ReceiversBreadcrumb({
  withLeftArrow,
  withId
}: {
  withLeftArrow?: boolean;
  withId?: boolean;
}) {
  const items = [
    {
      href: PATHS.RECEIVERS,
      title: 'Almaga gelenler'
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
