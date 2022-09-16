import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import Cookies from "js-cookie";

import { Box } from "@mui/material";

import axios from "axios";

import Tabs from "../../../atoms/Tabs";
import DashboardLayout from "../../../components/Layouts/Dashboard";
import ProtectedRoute from "../../../components/ProtectedRoute";
import TransactionTable from "../../../components/Transactions/TransactionTable";

const Transaction = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    // setData([]);
    const config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/${router.query.pid}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("iPayT")}`,
        "Device-Channel": "web",
      },
      withCredentials: true,
    };

    axios(config)
      .then((response) => {
        if (response.data.success === true) {
          setData(response.data.response.data);
        } else {
          setError("Something Went Wrong");
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.response === undefined) {
          setError("Something Went Wrong");
        } else if (err.response.status === 401) {
          return {
            redirect: {
              permanent: false,
              destination: `/`,
            },
          };
        } else if (err.response) {
          if (err.response.data.response !== undefined) {
            setError(err.response.data.response);
          } else {
            setError("Something Went Wrong, Reload to Retry");
          }
        } else {
          setError("Something Went Wrong");
        }
        setLoading(false);
        return error;
      });
  }, [router.query]);

  const tabTitle = ["payins", "payouts", "billing"];

  const positionStyles = {
    position: "sticky",
    top: { xs: 105, sm: 108, md: 109 },
    backgroundColor: (theme) => theme.colors.mono1,
    width: "100%",
    zIndex: 999,
    height: "60px",
  };

  // if (error) {
  //   return <div>{error}</div>;
  // }

  return (
    <Box sx={{ p: 10 }}>
      <Tabs
        tabTitle={tabTitle}
        positionStyles={positionStyles}
        activeTab={tabTitle.indexOf(router.query.pid).toString()}
        routeOnChange
      >
        <TransactionTable
          name="payins"
          rows={data}
          loading={loading}
          currentPage={parseInt(router.query.page, 10)}
        />
        <TransactionTable
          name="payouts"
          rows={data}
          loading={loading}
          currentPage={parseInt(router.query.page, 10)}
        />
        <TransactionTable
          name="billing"
          rows={data}
          loading={loading}
          currentPage={parseInt(router.query.page, 10)}
        />
      </Tabs>
    </Box>
  );
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

  return {
    props: {},
  };
});
