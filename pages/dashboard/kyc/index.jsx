import { useState, useEffect } from "react";

import axios from "axios";

import { Box } from "@mui/material";

import { useSelector } from "react-redux";

import Cookies from "js-cookie";
import ErrorBoundary from "../../../atoms/ErrorBoundary";

import HorizontalLinearStepper from "../../../components/Kyc/Stepper";
import DashboardLayout from "../../../components/Layouts/Dashboard";
import ProtectedRoute from "../../../components/ProtectedRoute";

import Loader from "../../../atoms/Loader";

const Kyc = () => {
  const companyRef = useSelector((state) => state.user.user.companyRef);
  const credentials = Cookies.get("iPayT");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    setLoading(true);
    const config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/kyc/${companyRef}/formDeterminer`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials}`,
        "Device-Channel": "web",
      },
      withCredentials: true,
    };
    axios(config)
      .then((response) => {
        if (response.data.success === true) {
          setData(response.data.response);
        } else {
          setError("Something Went Wrong, Reload to Retry");
        }
        return setLoading(false);
      })
      .catch((err) => {
        if (err.response === undefined) {
          setError("Something Went Wrong, Reload to Retry");
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
          setError("Something Went Wrong, Reload to Retry");
        }
        return setLoading(false);
      });
  }, []);

  if (error !== "") {
    return <ErrorBoundary error={error} />;
  }

  if (
    loading ||
    typeof data === "string" ||
    data === "" ||
    data.length === 0 ||
    data === null
  ) {
    return (
      <Box sx={{ pt: 20 }}>
        <Loader />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "white" }}>
      <HorizontalLinearStepper
        flow={data.flow}
        companyType={data.companyType}
        duration={data.duration}
      />
    </Box>
  );
};

export default Kyc;

Kyc.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps = ProtectedRoute(async (context) => {
  const { req } = context;
  return {
    props: {},
  };
});
