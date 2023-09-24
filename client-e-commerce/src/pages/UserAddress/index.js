import React from "react";
import { Link } from "react-router-dom";
import { Button, Text } from "upkit";
import { LayoutOne, Table } from "upkit/dist";
import { useAddressData } from "../../app/hooks/address";
import TopBar from "../../components/TopBar";

const columns = [
  { Header: "Nama", accessor: "nama" },
  {
    Header: "Detail",
    accessor: (alamat) => {
      return (
        <div>
          {alamat.provinsi}, {alamat.kabupaten}, {alamat.kecamatan},{" "}
          {alamat.kelurahan} <br />
          {alamat.detail}
        </div>
      );
    },
  },
];

export default function UserAddress() {
  const { count, data, limit, page, setPage, status } = useAddressData();

  return (
    <LayoutOne size="large">
      <div>
        <TopBar />
        <Text>Alamat Pengiriman</Text>
        <br />
        <div>
          <Link to="alamat-pengiriman/tambah">
            <Button>Tambah baru</Button>
          </Link>
          <br />
          <br />
          {data && data.length > 0 ? (
            <Table
              items={data}
              columns={columns}
              totalItems={count}
              page={page}
              isLoading={status === "process"}
              perPage={limit}
              onPageChange={(page) => setPage(page)}
            />
          ) : (
            <div className="text-center p-10">
              Kamu belum menambahkan alamat pengiriman. <br />
              <Link to="/alamat-pengiriman/tambah">
                <Button> Tambah Baru </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </LayoutOne>
  );
}
