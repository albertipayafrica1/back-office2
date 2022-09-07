import { useRouter } from "next/router";
import PropTypes from "prop-types";

import { Box } from "@mui/material";

import axios from "axios";

import Tabs from "../../../atoms/Tabs";
import DashboardLayout from "../../../components/Layouts/Dashboard";
import ProtectedRoute from "../../../components/ProtectedRoute";
import TransactionTable from "../../../components/TransactionTable";

const Transaction = ({ data, error }) => {
  const router = useRouter();

  const tabTitle = ["payins", "payouts", "billing"];

  const positionStyles = {
    position: "sticky",
    top: { xs: 105, sm: 108, md: 109 },
    backgroundColor: (theme) => theme.colors.mono1,
    width: "100%",
    zIndex: 999,
    height: "60px",
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box sx={{ p: 10 }}>
      <Tabs
        tabTitle={tabTitle}
        positionStyles={positionStyles}
        activeTab={tabTitle.indexOf(router.query.pid).toString()}
        routeOnChange
      >
        <TransactionTable name="payins" rows={data} />
        <TransactionTable name="payouts" rows={data} />
        <TransactionTable name="billing" rows={data} />
      </Tabs>
    </Box>
  );
};

Transaction.propTypes = {
  data: PropTypes.arrayOf({}).isRequired,
  error: PropTypes.string.isRequired,
};

export default Transaction;

Transaction.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps = ProtectedRoute(async (context) => {
  const { req, query } = context;

  if (
    query.pid !== "payins" &&
    query.pid !== "payouts" &&
    query.pid !== "billing"
  ) {
    return {
      notFound: true,
    };
  }

  let data = "";
  let error = "";

  const config = {
    method: "get",
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/${query.pid}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${req.cookies.iPayT}`,
      "Device-Channel": "web",
    },
    withCredentials: true,
  };
  const start = Date.now();

  await axios(config)
    .then((response) => {
      console.log(response);
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

  const finish = Date.now();

  const time = (finish - start) / 1000;
  console.log(time);
  return {
    props: {
      data,
      error,
    },
  };
});
