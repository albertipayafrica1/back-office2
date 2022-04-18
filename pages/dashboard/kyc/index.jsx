import PropTypes from "prop-types";
import axios from "axios";

import ErrorBoundary from "../../../atoms/ErrorBoundary";

import HorizontalLinearStepper from "../../../components/Stepper";
import ProtectedRoute from "../../../components/ProtectedRoute";

import { wrapper } from "../../../redux/store";

const Kyc = ({ data, error }) => {
  if (error !== "") {
    return <ErrorBoundary error={error} />;
  }
  return (
    <HorizontalLinearStepper
      // flow={data.flow}
      // companyType={data.companyType}
      // duration={data.duration}
      flow="registered"
      companyType="privateLimited"
    />
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

export const getServerSideProps = ProtectedRoute(
  wrapper.getServerSideProps((store) => async (context) => {
    const { req } = context;

    console.log(req.cookies.iPayT);

    let data = "";
    let error = "";

    const config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/kyc/formDeterminer`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.cookies.iPayT}`,
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
        // console.log(err, "error");
        if (err.response === undefined) {
          console.log("first");
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
            console.log("third1");
            error = error.response.data.response;
          } else {
            console.log("third2");
            error = "Something Went Wrong, Reload to Retry";
            console.log(error, "errrrr");
          }
        } else {
          console.log("fourth");
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
  })
);
