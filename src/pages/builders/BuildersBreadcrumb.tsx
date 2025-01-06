import GeneralBreadCrumb from '@/components/GeneralBreadCrumb';
import { PATHS } from '@/routes/paths';

export default function BuildersBreadcrumb({
  withLeftArrow,
  withId
}: {
  withLeftArrow?: boolean;
  withId?: boolean;
}) {
  const items = [
    {
      href: PATHS.BUILDERS,
      title: 'Gurujylar'
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
