import GeneralBreadCrumb from '@/components/GeneralBreadCrumb';

export default function BuildingsBreadcrumb({
  withLeftArrow,
  withId,
}: {
  withLeftArrow?: boolean;
  withId?: boolean;
}) {
  const items = [
    {
      href: '/buildings',
      title: 'Desgalar',
    },
  ];

  return (
    <GeneralBreadCrumb
      withLeftArrow={withLeftArrow}
      items={[...items]}
      withId={withId}
    />
  );
}
