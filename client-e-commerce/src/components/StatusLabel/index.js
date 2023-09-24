import React from "react";
import { Badge } from "upkit/dist";
import PropTypes from "prop-types";

export default function StatusLabel({ status }) {
  switch (status) {
    case "waiting_payment":
      return <Badge color="red">Menunggu pembayaran</Badge>;

    case "paid":
      return <Badge color="yellow">Sudah dibayar</Badge>;

    case "processing":
      return <Badge color="green">Sedang diproses</Badge>;

    case "in_delivery":
      return <Badge color="blue">Dalam pengiriman</Badge>;

    case "delivered":
      return <Badge color="green">Pesanan diterima</Badge>;

    default:
      return <div />;
  }
}

StatusLabel.defaultProps = {
  status: "waiting_payment",
};

StatusLabel.propTypes = {
  status: PropTypes.string.isRequired,
};
