import { Descriptions, Empty, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import { IRegistry } from '@/features/registries/types';

const { Text } = Typography;

interface OldRegistryDataProps {
  registry: IRegistry;
}

const formatDate = (value?: string) =>
  value ? dayjs(value).format('DD.MM.YYYY') : '-';

// Legacy values copied verbatim from the old_registries (mainpayly) table
export default function OldRegistryData({ registry }: OldRegistryDataProps) {
  if (!registry?.old_registry_id) {
    return (
      <Empty description='Bu reýestr öňki maglumatlardan geçirilmedik' />
    );
  }

  const items = [
    { label: 'T/B', value: registry.old_t_b },
    { label: 'Min hat', value: registry.old_min_hat },
    {
      label: 'Sene hat min to mud',
      value: formatDate(registry.old_sene_hat_min_to_mud),
    },
    { label: 'Gurujy', value: registry.old_gurujy },
    { label: 'Salgy gurujy', value: registry.old_salgy_gurujy },
    { label: 'Paýçy', value: registry.old_paychy },
    { label: 'Salgy paýçy', value: registry.old_salgy_paychy },
    {
      label: 'Şertnama gurujy-paýçy',
      value: registry.old_sertnama_gurujy_paychy,
    },
    { label: 'Desga', value: registry.old_desga },
    { label: 'Salgy desga', value: registry.old_salgy_desga },
    { label: 'Baha umumy', value: registry.old_baha_umumy },
    { label: 'Meýdan umumy', value: registry.old_meydan_umumy },
    { label: 'Kep resminama', value: registry.old_kep_resminama },
    { label: 'Emläk paýçy', value: registry.old_emlak_paychy },
    { label: 'Baha paýçy', value: registry.old_baha_paychy },
    { label: 'Baha 1m² paýçy', value: registry.old_baha_1m2_paychy },
    { label: 'Baş potratçy', value: registry.old_bash_potr },
    { label: 'Şertnama gur-potr', value: registry.old_sertnama_gur_potr },
    { label: 'Potratçy kömek', value: registry.old_potratchy_komek },
    { label: 'Şahadatnama', value: registry.old_shahadatnama },
    { label: 'Ygtyýarnama', value: registry.old_ygtyyarnama },
    { label: 'Patent/pasport', value: registry.old_patent_pasport },
    { label: 'Sene başy-soňy', value: registry.old_sene_bashy_songy },
    {
      label: 'Sene seredilen',
      value: formatDate(registry.old_sene_seredilen),
    },
    { label: 'Sene hasaba alnan', value: registry.old_sene_hasaba_alnan },
    { label: 'Wezipe alan adam', value: registry.old_wezipe_alan_adam },
    { label: 'Ady alan adam', value: registry.old_ady_alan_adam },
    { label: 'Sene san şertnama', value: registry.old_sene_san_sertnama },
    { label: 'Ady paýçy alan', value: registry.old_ady_paychy_alan },
    { label: 'Sene paýçy alan', value: registry.old_sene_paychy_alan },
    { label: 'Login', value: registry.old_login },
  ];

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Tag color='orange'>Öňki reýestrden geçirilen maglumat</Tag>
        <Text type='secondary'>
          (old_registry_id: {registry.old_registry_id})
        </Text>
      </div>
      <Descriptions bordered size='small' column={2}>
        {items.map((item) => (
          <Descriptions.Item key={item.label} label={item.label}>
            {item.value || '-'}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </>
  );
}
