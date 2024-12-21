import GeneralBreadCrumb from '@/components/GeneralBreadCrumb';

export default function GeneralContractorsBreadcrumb({
  items
}: {
  items?: Array<{ title: JSX.Element } | { href: string; title: string }>;
}) {
  return (
    <GeneralBreadCrumb
      items={[
        {
          href: '/general_contractors',
          title: 'Baş potratçylar'
        },
        ...(items ?? [])
      ]}
    />
  );
}
