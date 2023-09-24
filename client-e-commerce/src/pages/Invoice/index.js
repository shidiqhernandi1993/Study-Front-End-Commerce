import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { Table, Text } from "upkit";
import { LayoutOne } from "upkit/dist";
import { getInvoiceByOrderId } from "../../app/api/invoice";
import StatusLabel from "../../components/StatusLabel";
import TopBar from "../../components/TopBar";
import { config } from "../../config";
import { rupiahFormat } from "../../app/utils";

export default function Invoice() {
  const [invoice, setInvoice] = useState({});
  const [error, setError] = useState("");
  const [status, setStatus] = useState("process");
  const { order_id } = useParams();

  useEffect(() => {
    getInvoiceByOrderId(order_id)
      .then(({ data }) => {
        if (data.error) {
          setError(data.message);
        }
        setInvoice(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setStatus("success"));
  }, [order_id]);

  if (status === "process") {
    return (
      <LayoutOne>
        <div className="text-center py-10">
          <div className="inline-block">
            <BounceLoader color="blue" />
          </div>
        </div>
      </LayoutOne>
    );
  }

  return (
    <LayoutOne>
      <TopBar />
      <Text as="h3">{error ? error : "Invoice"}</Text>
      <br />
      {invoice && Object.keys(invoice).length > 0 ? (
        <Table
          showPagination={false}
          items={[
            {
              label: "Status",
              value: <StatusLabel status={invoice?.payment_status} />,
            },
            { label: "Order ID", value: "#" + invoice?.order?.order_number },
            { label: "Total amount", value: rupiahFormat(invoice?.total) },
            {
              label: "Billed to",
              value: (
                <div>
                  <b>{invoice?.user?.full_name} </b> <br />
                  {invoice?.user?.email} <br /> <br />
                  {invoice?.delivery_address?.detail} <br />
                  {invoice?.delivery_address?.kelurahan},
                  {invoice?.delivery_address?.kecamatan} <br />
                  {invoice?.delivery_address?.kabupaten} <br />
                  {invoice?.delivery_address?.provinsi}
                </div>
              ),
            },
            {
              label: "Payment to",
              value: (
                <div>
                  {config.owner} <br />
                  {config.contact} <br />
                  {config.billing.account_no} <br />
                  {config.billing.bank_name}
                </div>
              ),
            },
          ]}
          columns={[
            { Header: "Invoice", accessor: "label" },
            { Header: "", accessor: "value" },
          ]}
        />
      ) : (
        <Text>Data invoice tidak ditemukan.</Text>
      )}
    </LayoutOne>
  );
}
