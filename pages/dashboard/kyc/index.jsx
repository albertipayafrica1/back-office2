import PropTypes from "prop-types";
import axios from "axios";

import { Box } from "@mui/material";

import ErrorBoundary from "../../../atoms/ErrorBoundary";

import HorizontalLinearStepper from "../../../components/Kyc/Stepper";
import DashboardLayout from "../../../components/Layouts/Dashboard";
import ProtectedRoute from "../../../components/ProtectedRoute";

const Kyc = ({ data, error }) => {
  if (error !== "") {
    return <ErrorBoundary error={error} />;
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

Kyc.propTypes = {
  data: PropTypes.shape({
    flow: PropTypes.string,
    companyType: PropTypes.string,
    duration: PropTypes.string,
  }).isRequired,
  error: PropTypes.string.isRequired,
};

export default Kyc;

Kyc.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps = ProtectedRoute(async (context) => {
  const { req } = context;

  let data = "";
  let error = "";

  const config = {
    method: "get",
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/kyc/formDeterminer`,
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
        data = response.data.response;
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

  return {
    props: {
      data,
      error,
    },
  };
});
