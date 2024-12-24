import { useIsNew } from '@/utils/hooks/paramsHooks';
import { Col, Flex, Form, Input, Row, Skeleton } from 'antd';
import GeneralContractorsBreadcrumb from '../generalContractors/GeneralContractorsBreadcrumb';
import { IGeneralContractor } from '@/features/generalContractors/types';
import { rules } from '@/utils/rules';
import FormOrgContent from '@/components/common/FormOrgContent';
import CertContent from '@/components/common/CertContent';
import ResolutionContent from '@/components/common/ResolutionContent';
import { useEffect } from 'react';
import { useGetGeneralContractorQuery } from '@/features/generalContractors/generalContractorsApiSlice';
import { getDateOrNull } from '@/utils/convertors';

export default function GeneralContractor() {
  const { idTk, isNew, id } = useIsNew();

  const [form] = Form.useForm<IGeneralContractor>();

  const { data: generalContractor, isLoading: isLoadingGeneralContractor } =
    useGetGeneralContractorQuery(id!, { skip: isNew });

  console.log('generalContractor', generalContractor);

  useEffect(() => {
    if (generalContractor) {
      form.setFieldsValue({
        id: generalContractor.id,
        org_name: generalContractor.org_name,
        head_position: generalContractor.head_position,
        head_full_name: generalContractor.head_full_name,
        org_additional_info: generalContractor.org_additional_info,
        cert_number: generalContractor.cert_number,
        cert_date: getDateOrNull(generalContractor.cert_date),
        resolution_code: generalContractor.resolution_code,
        resolution_begin_date: getDateOrNull(
          generalContractor.resolution_begin_date
        ),
        resolution_end_date: getDateOrNull(
          generalContractor.resolution_end_date
        ),
      });
    }
  }, [form, generalContractor]);

  if (isLoadingGeneralContractor) return <Skeleton />;

  return (
    <Flex vertical gap={16}>
      <GeneralContractorsBreadcrumb
        withLeftArrow
        items={[{ title: idTk!, href: '' }]}
      />
      <Form size='small' form={form} name='general_contractor_modal_form'>
        <Row gutter={2}>
          <Col span={24}>
            <Form.Item name='id' label='id' rules={[rules.non_required()]}>
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={24}>
            <FormOrgContent />
          </Col>
          <Col span={12}>
            <CertContent />
          </Col>
          <Col span={12}>
            <ResolutionContent />
          </Col>
        </Row>
      </Form>
    </Flex>
  );
}
