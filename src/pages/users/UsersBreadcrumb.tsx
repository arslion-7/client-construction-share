import GeneralBreadCrumb from '@/components/GeneralBreadCrumb';
import { PATHS } from '@/routes/paths';

export default function UsersBreadcrumb({
  withLeftArrow,
  withId
}: {
  withLeftArrow?: boolean;
  withId?: boolean;
}) {
  const items = [
    {
      href: PATHS.USERS,
      title: 'Ulanyjylar'
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
