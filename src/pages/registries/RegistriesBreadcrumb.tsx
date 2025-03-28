import GeneralBreadCrumb from '@/components/GeneralBreadCrumb';
import { PATHS } from '@/routes/paths';

export default function RegistriesBreadcrumb({
  withLeftArrow,
  withId
}: {
  withLeftArrow?: boolean;
  withId?: boolean;
}) {
  const items = [
    {
      href: PATHS.REGISTRIES,
      title: 'Reýestr'
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
