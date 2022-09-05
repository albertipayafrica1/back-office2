import PropTypes from "prop-types";

import { Box } from "@mui/material";

import axios from "axios";

import Tabs from "../../../atoms/Tabs";
import DashboardLayout from "../../../components/Layouts/Dashboard";
import ProtectedRoute from "../../../components/ProtectedRoute";
import TransactionTable from "../../../components/TransactionTable";

const Transaction = ({ data }) => {
  console.log(data);
  const tabTitle = ["Payins", "Payouts", "Billing"];

  const positionStyles = {
    position: "sticky",
    top: { xs: 105, sm: 108, md: 109 },
    backgroundColor: (theme) => theme.colors.mono1,
    width: "100%",
    zIndex: 999,
    height: "60px",
  };

  return (
    <Box sx={{ p: 10 }}>
      <Tabs tabTitle={tabTitle} positionStyles={positionStyles}>
        <TransactionTable name="payins" rows={data} />
        <TransactionTable name="payouts" />
        <TransactionTable name="billing" />
      </Tabs>
    </Box>
  );
};

Transaction.propTypes = {
  data: PropTypes.arrayOf({}).isRequired,
};

export default Transaction;

Transaction.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps = ProtectedRoute(async (context) => {
  const { req } = context;

  let data = "";
  let error = "";

  const config = {
    method: "get",
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/payins`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${req.cookies.iPayT}`,
      "Device-Channel": "web",
    },
    withCredentials: true,
  };
  await axios(config)
    .then((response) => {
      if (response.data.success === true) {
        data = response.data.response.data;
      } else {
        error = "Something Went Wrong";
      }
    })
    .catch((err) => {
      if (err.response === undefined) {
        error = "Something Went Wrong";
      } else if (err.response.status === 401) {
        return {
          redirect: {
            permanent: false,
            destination: `/`,
          },
        };
      } else if (err.response) {
        if (err.response.data.response !== undefined) {
          error = error.response.data.response;
        } else {
          error = "Something Went Wrong, Reload to Retry";
        }
      } else {
        error = "Something Went Wrong";
      }
      return error;
    });

  console.log(data);

  return {
    props: {
      data,
      error,
    },
  };
});
