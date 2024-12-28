import GeneralBreadCrumb from '@/components/GeneralBreadCrumb';

export default function UsersBreadcrumb({
  withLeftArrow,
  withId
}: {
  withLeftArrow?: boolean;
  withId?: boolean;
}) {
  const items = [
    {
      href: '/users',
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
