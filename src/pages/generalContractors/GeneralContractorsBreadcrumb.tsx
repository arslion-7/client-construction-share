import GeneralBreadCrumb from '@/components/GeneralBreadCrumb';

export default function GeneralContractorsBreadcrumb({
  withLeftArrow,
  withId,
}: {
  withLeftArrow?: boolean;
  withId?: boolean;
}) {
  const items = [
    {
      href: '/general_contractors',
      title: 'Baş potratçylar',
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
