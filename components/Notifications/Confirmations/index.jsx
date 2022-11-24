import { useState } from "react";
import PropTypes from "prop-types";

import { Stack } from "@mui/material";

import TransactionButton from "../../../atoms/TransactionButton";
import Table from "../../../atoms/Table";
import PageViewBox from "../../../atoms/PageViewBox";

import * as styles from "./styles";

const TransactionTable = ({ name, rows, loading, currentPage }) => {
  let givenRows = rows;
  if (rows === null || rows === undefined) {
    givenRows = [];
  }

  const [detailsData, setDetailsData] = useState([]);

  return (
    <>
      <Table
        columns={[]}
        rows={givenRows}
        name={name}
        loading={loading}
        currentPage={currentPage}
        totalPages={100}
      />
    </>
  );
};

TransactionTable.defaultProps = {
  loading: false,
  currentPage: 0,
};

TransactionTable.propTypes = {
  name: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf({}).isRequired,
  loading: PropTypes.bool,
  currentPage: PropTypes.number,
};

export default TransactionTable;
