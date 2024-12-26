import GeneralBreadCrumb from '@/components/GeneralBreadCrumb';

export default function RegistriesBreadcrumb({
  withLeftArrow,
  withId,
}: {
  withLeftArrow?: boolean;
  withId?: boolean;
}) {
  const items = [
    {
      href: '/registries',
      title: 'Reýestr',
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
