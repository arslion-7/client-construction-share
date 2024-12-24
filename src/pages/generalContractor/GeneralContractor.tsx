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
import dayjs from 'dayjs';
import SubmitButton from '@/components/SubmitButton';

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
        t_b: generalContractor.t_b,
        org_name: generalContractor.org_name,
        head_position: generalContractor.head_position,
        head_full_name: generalContractor.head_full_name,
        org_additional_info: generalContractor.org_additional_info,
        cert_number: generalContractor.cert_number,
        cert_date: dayjs(generalContractor.cert_date),
        resolution_code: generalContractor.resolution_code,
        resolution_begin_date: dayjs(generalContractor.resolution_begin_date),
        resolution_end_date: dayjs(generalContractor.resolution_end_date)
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
      <Form size='small' form={form} name='general_contractor_form'>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item wrapperCol={{ offset: 22, span: 2 }}>
              <SubmitButton // loading={isLoadingCreate || isLoadingUpdate}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name='t_b' label='t_b' rules={[rules.non_required()]}>
              <Input />
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
          <Col span={24}>
            <Form.Item wrapperCol={{ offset: 22, span: 2 }}>
              <SubmitButton // loading={isLoadingCreate || isLoadingUpdate}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Flex>
  );
}
