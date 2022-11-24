import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Cookies from "js-cookie";

import axios from "axios";

import { Typography, Box } from "@mui/material";

import DashboardLayout from "../../../../components/Layouts/Dashboard";
import ProtectedRoute from "../../../../components/ProtectedRoute";
import AuditTrailTable from "../../../../components/Settings/AuditTrail/AuditTrailTable";

const AuditTrail = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    // setData([]);
    const config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auditTrail/${router.query.pid}`,
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

  // if (error) {
  //   return <div>{error}</div>;
  // }
  return (
    <Box sx={{ p: 10 }}>
      <AuditTrailTable
        name="auditTrail"
        rows={data}
        loading={loading}
        currentPage={parseInt(router.query.page, 10)}
      />
    </Box>
  );
};

export default AuditTrail;

AuditTrail.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps = ProtectedRoute(async (context) => {
  return {
    props: {},
  };
});