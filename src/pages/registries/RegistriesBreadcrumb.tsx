import GeneralBreadCrumb from '@/components/GeneralBreadCrumb';

export default function RegistriesBreadcrumb({
  items,
  withLeftArrow
}: {
  items?: Array<{ title: JSX.Element } | { href: string; title: string }>;
  withLeftArrow?: boolean;
}) {
  return (
    <GeneralBreadCrumb
      withLeftArrow={withLeftArrow}
      items={[
        {
          href: '/registries',
          title: 'Reýestr'
        },
        ...(items ?? [])
      ]}
    />
  );
}
