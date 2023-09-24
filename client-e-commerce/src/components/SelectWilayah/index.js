import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Select } from "upkit";

export default function SelectWilayah({ tingkat, kodeInduk, onChange, value }) {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    let endpoint;
    if (tingkat === "provinces") {
      endpoint =
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json";
    } else {
      endpoint = `https://www.emsifa.com/api-wilayah-indonesia/api/${tingkat}/${kodeInduk}.json`;
    }
    axios
      .get(endpoint)
      .then(({ data }) => setData(data))
      .finally(() => setIsFetching(false));
  }, [kodeInduk, tingkat]);

  return (
    <Select
      options={data.map((wilayah) => ({
        label: wilayah.name,
        value: wilayah.id,
      }))}
      onChange={onChange}
      value={value}
      isLoading={isFetching}
      isDisabled={isFetching || !data.length}
    />
  );
}

SelectWilayah.propTypes = {
  tingkat: PropTypes.oneOf(["provinces", "regencies", "districts", "villages"]),
  kodeInduk: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
};

SelectWilayah.defaultProps = {
  tingkat: "provinces",
};
