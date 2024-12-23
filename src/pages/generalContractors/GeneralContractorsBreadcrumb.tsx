import GeneralBreadCrumb from '@/components/GeneralBreadCrumb';

export default function GeneralContractorsBreadcrumb({
  items,
  withLeftArrow,
}: {
  items?: Array<{ title: JSX.Element } | { href: string; title: string }>;
  withLeftArrow?: boolean;
}) {
  return (
    <GeneralBreadCrumb
      withLeftArrow={withLeftArrow}
      items={[
        {
          href: '/general_contractors',
          title: 'Baş potratçylar',
        },
        ...(items ?? []),
      ]}
    />
  );
}
