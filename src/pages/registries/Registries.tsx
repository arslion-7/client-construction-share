import React, { useState } from "react";
import RegistriesTable from "./RegistriesTable";
import { Alert, Button, Flex, Modal, Skeleton, Table } from "antd";
import TableHeader from "@/components/TableHeader/TableHeader";
import { usePaginationSearch } from "@/utils/hooks/paramsHooks";
import RegistriesBreadcrumb from "./RegistriesBreadcrumb";
import {
  useGetRegistriesQuery,
  useLazyGetDuplicateTBsQuery,
} from "@/features/registries/registriesApiSlice";
import { IDuplicateTB } from "@/features/registries/types";

const Registries: React.FC = () => {
  const { page, pageSize, search } = usePaginationSearch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: paginatedData, isLoading: isLoadingGeneralContractors } =
    useGetRegistriesQuery({
      page,
      pageSize,
      search,
    });

  const [
    getDuplicateTBs,
    { data: duplicateTBs, isLoading: isLoadingDuplicateTBs },
  ] = useLazyGetDuplicateTBsQuery();

  const handleCheckDuplicateTBs = async () => {
    await getDuplicateTBs();
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "T/B",
      dataIndex: "t_b",
      key: "t_b",
    },
  ];

  return (
    <Flex vertical gap={16}>
      <RegistriesBreadcrumb />
      <Flex gap={16}>
        <TableHeader />
        <Button
          onClick={handleCheckDuplicateTBs}
          loading={isLoadingDuplicateTBs}
        >
          Gaýtalanýan T/B-leri barla
        </Button>
      </Flex>
      <Alert
        message="Reňkli setirler - Ret edilen ýazgylar (çep tarapynda gyzyl çyzyk)"
        type="info"
        showIcon
        closable
      />
      {isLoadingGeneralContractors ? (
        <Skeleton />
      ) : (
        <RegistriesTable paginatedData={paginatedData!} />
      )}
      <Modal
        title="Gaýtalanýan T/B-ler"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={500}
      >
        <Table<IDuplicateTB>
          dataSource={duplicateTBs}
          columns={columns}
          rowKey="id"
          pagination={false}
          locale={{ emptyText: "Gaýtalanýan T/B tapylmady" }}
        />
      </Modal>
    </Flex>
  );
};

export default Registries;
