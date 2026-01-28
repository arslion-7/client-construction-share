import { useState } from "react";
import { usePaginationSearch } from "@/utils/hooks/paramsHooks";
import { Button, Flex, Modal, Skeleton, Table } from "antd";
import TableHeader from "@/components/TableHeader/TableHeader";

import {
  useGetShareholdersQuery,
  useLazyGetInvalidPassportsQuery,
} from "@/features/shareholders/shareholdersApiSlice";
import ShareholdersBreadcrumb from "./ShareholdersBreadcrumb";
import ShareholdersTable from "./ShareholdersTable";
import { IInvalidPassport } from "@/features/shareholders/types";

export default function Shareholders() {
  const { page, pageSize, search } = usePaginationSearch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: paginatedData, isLoading: isLoadingGeneralContractors } =
    useGetShareholdersQuery({
      page,
      pageSize,
      search,
    });

  const [
    getInvalidPassports,
    { data: invalidPassports, isLoading: isLoadingInvalidPassports },
  ] = useLazyGetInvalidPassportsQuery();

  const handleCheckInvalidPassports = async () => {
    await getInvalidPassports();
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Pasport belgisi",
      dataIndex: "passport_number",
      key: "passport_number",
    },
  ];

  return (
    <Flex vertical gap={16}>
      <ShareholdersBreadcrumb />
      <Flex gap={16}>
        <TableHeader />
        <Button
          onClick={handleCheckInvalidPassports}
          loading={isLoadingInvalidPassports}
        >
          Nädogry pasport belgilerini barla
        </Button>
      </Flex>
      {isLoadingGeneralContractors ? (
        <Skeleton />
      ) : (
        <ShareholdersTable paginatedData={paginatedData!} />
      )}
      <Modal
        title="Nädogry pasport belgileri"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={500}
      >
        <Table<IInvalidPassport>
          dataSource={invalidPassports}
          columns={columns}
          rowKey="id"
          pagination={false}
          locale={{ emptyText: "Nädogry pasport belgisi tapylmady" }}
        />
      </Modal>
    </Flex>
  );
}
