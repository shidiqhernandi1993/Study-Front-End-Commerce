import { FaFileInvoiceDollar } from "@meronex/icons/fa";
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button, LayoutOne, Table, Text } from "upkit";
import TopBar from "../../components/TopBar";
import { getOrders } from "../../app/api/order";
import { rupiahFormat } from "../../app/utils";

const columns = [
  {
    Header: "",
    id: "Status",
    accessor: (order) => {
      return (
        <div>
          #{order.order_number} <br />
        </div>
      );
    },
  },
  {
    Header: "Items",
    accessor: (order) => {
      return (
        <div>
          {order.order_items.map((item) => {
            return (
              <div key={item._id}>
                {item.name} {item.qty}
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    Header: "Total",
    accessor: (order) => {
      return (
        <div>
          {rupiahFormat(order.order_items[0].price + order.delivery_fee)}
        </div>
      );
    },
  },
  {
    Header: "Invoice",
    accessor: (order) => {
      return (
        <div>
          <Link to={`/invoice/${order._id}`}>
            <Button color="gray" iconBefore={<FaFileInvoiceDollar />}>
              Invoice
            </Button>
          </Link>
        </div>
      );
    },
  },
];

export default function UserOrder() {
  const [pesanan, setPesanan] = useState([]);
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState("idle");
  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchPesanan = useCallback(async () => {
    setStatus("process");
    try {
      let { data } = await getOrders({ limit, page });
      console.log("Data from getOrders:", data);

      if (data.error) {
        setStatus("error");
        return;
      }
      setPesanan(data.data);
      setStatus("success");
      setCount(data.count);
    } catch (error) {
      setStatus("error");
    }
  }, [page, limit]);

  useEffect(() => {
    fetchPesanan();
  }, [fetchPesanan]);

  return (
    <LayoutOne>
      <TopBar />
      <Text as="h3"> Pesanan Anda </Text>
      <br />

      <Table
        items={pesanan}
        totalItems={count}
        columns={columns}
        onPageChange={(page) => setPage(page)}
        page={page}
        isLoading={status === "process"}
      />
    </LayoutOne>
  );
}
