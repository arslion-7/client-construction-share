import React, { useState } from "react";
import RegistriesTable from "./RegistriesTable";
import {
  Button,
  Flex,
  Modal,
  Segmented,
  Skeleton,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import TableHeader from "@/components/TableHeader/TableHeader";
import { usePaginationSearch } from "@/utils/hooks/paramsHooks";
import RegistriesBreadcrumb from "./RegistriesBreadcrumb";
import { useSearchParams } from "react-router";
import {
  useGetRegistriesQuery,
  useLazyGetDuplicateTBsQuery,
} from "@/features/registries/registriesApiSlice";
import { IDuplicateTB } from "@/features/registries/types";

const Registries: React.FC = () => {
  const { page, pageSize, search } = usePaginationSearch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const source = searchParams.get("source") || "";

  const onChangeSource = (value: string) => {
    if (value) {
      searchParams.set("source", value);
    } else {
      searchParams.delete("source");
    }
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  const { data: paginatedData, isLoading: isLoadingGeneralContractors } =
    useGetRegistriesQuery({
      page,
      pageSize,
      search,
      source,
      t_b: searchParams.get("t_b") || "",
      gc_ids: searchParams.get("gc_ids") || "",
      user_ids: searchParams.get("user_ids") || "",
      shareholder_q: searchParams.get("shareholder_q") || "",
      builder_q: searchParams.get("builder_q") || "",
      building_q: searchParams.get("building_q") || "",
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
        <Segmented
          value={source}
          onChange={onChangeSource}
          options={[
            { label: "Ählisi", value: "" },
            { label: "Täze", value: "new" },
            { label: "Öňki", value: "old" },
          ]}
        />
        <Button
          onClick={handleCheckDuplicateTBs}
          loading={isLoadingDuplicateTBs}
        >
          Gaýtalanýan T/B-leri barla
        </Button>
      </Flex>
      <Flex gap={24} wrap align="center">
        <Space size={8}>
          <Tag color="red" style={{ margin: 0 }}>
            Gyzyl setirler
          </Tag>
          <Typography.Text type="secondary">
            Ret edilen ýazgylar (çep tarapynda gyzyl çyzyk)
          </Typography.Text>
        </Space>
        <Space size={8}>
          <Tag color="orange" style={{ margin: 0 }}>
            Mämişi setirler
          </Tag>
          <Typography.Text type="secondary">
            Öňki reýestrden geçirilen ýazgylar (çep tarapynda mämişi çyzyk)
          </Typography.Text>
        </Space>
      </Flex>
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
