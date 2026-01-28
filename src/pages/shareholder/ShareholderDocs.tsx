import { IShareholder, IShareholderDocs } from "@/features/shareholders/types";
import { useUpdateShareholderDocsMutation } from "@/features/shareholders/shareholdersApiSlice";
import { useIsNew } from "@/utils/hooks/paramsHooks";
import { useMessageApi } from "@/utils/messages";
import { Divider, Form, Input, InputNumber, Select } from "antd";
import SubmitButton from "@/components/button/SubmitButton";

interface IProps {
  shareholder: IShareholder;
}

export default function ShareholderDocs({ shareholder }: IProps) {
  const { id } = useIsNew();
  const { messageApi } = useMessageApi();

  const [form] = Form.useForm();

  const [updateDocs, { isLoading: isLoadingUpdateDocs }] =
    useUpdateShareholderDocsMutation();

  const onFinish = async (values: IShareholderDocs) => {
    try {
      await updateDocs({
        id: id!,
        ...values,
      });
      messageApi.success("Paýçyň resminamalary täzelendi.");
    } catch (error) {
      console.log("Error on update docs", error);
      messageApi.error("Paýçyň resminamalary täzelenende näsazlyk ýüze çykdy.");
    }
  };

  return (
    <Form
      form={form}
      initialValues={shareholder}
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 10 }}
    >
      <Divider>Pasport</Divider>
      <Form.Item<IShareholderDocs>
        name="passport_series"
        label="Pasport seriýa"
      >
        <Select
          options={[
            { label: "I-AŞ" },
            { label: "II-AŞ" },
            { label: "I-AH" },
            { label: "I-MR" },
            { label: "I-LB" },
            { label: "I-BN" },
            { label: "I-DZ" },
          ].map((i) => ({ value: i.label, ...i }))}
        />
      </Form.Item>
      <Form.Item<IShareholderDocs>
        name="passport_number"
        label="Pasport belgisi"
        rules={[
          {
            pattern: /^\d{6}$/,
            message: "Pasport belgisi 6 sandan ybarat bolmaly",
          },
        ]}
      >
        <Input style={{ width: 165 }} maxLength={6} placeholder="XXXXXX" />
      </Form.Item>
      <Divider>Patent</Divider>
      <Form.Item<IShareholderDocs> name="patent_series" label="Patent seriýa">
        <Input />
      </Form.Item>
      <Form.Item<IShareholderDocs> name="patent_number" label="Patent belgisi">
        <InputNumber style={{ width: 165 }} controls={false} />
      </Form.Item>
      <Divider>Sertifikat</Divider>
      <Form.Item<IShareholderDocs>
        name="cert_number"
        label="Sertifikat belgisi"
      >
        <InputNumber style={{ width: 165 }} controls={false} />
      </Form.Item>
      <Form.Item<IShareholderDocs>
        name="docs_additional_info"
        label="Goşmaça maglumaty"
      >
        <Input.TextArea rows={4} cols={10} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 21, span: 3 }}>
        <SubmitButton loading={isLoadingUpdateDocs} size="middle" />
      </Form.Item>
    </Form>
  );
}
