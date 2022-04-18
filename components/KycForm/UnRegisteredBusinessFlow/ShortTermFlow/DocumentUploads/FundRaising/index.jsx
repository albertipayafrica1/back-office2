import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import PropTypes from "prop-types";

import axios from "axios";
import Cookies from "js-cookie";

import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";

import FormikControl from "../../../../../FormikControls/index";
import FundRaisingContainer from "../../../../../../atoms/CreateAccountFormDiv";
import MuiAlert from "../../../../../../atoms/MuiAlert";

import { fundRaising } from "../../../../../../utils/formValidations/kyc/unRegisteredBusinessFlow/shortTermFlow/documentUploads/fundRaising";

import { styles } from "../styles";

const initialValues = {
  coverLetter: [],
};

const FundRaising = ({ handleNextStep }) => {
  const router = useRouter();

  const [formValues, setFormValues] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleSubmit = (values, formikHelpers) => {
    setLoading(true);
    setAlert({ type: "", message: "" });
    const credentials = Cookies.get("iPayT");
    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/kyc/business-docs`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials}`,
      },
      data: JSON.stringify(values),
      withCredentials: true,
    };
    axios(config)
      .then((response) => {
        console.log(response, "response");
        if (response.data.success === true) {
          setAlert({
            type: "success",
            message: "Fulfillment Details Updated Successfully!",
          });
          handleNextStep();
          setLoading(false);
        } else {
          console.log(response, "response0");
          setAlert({ type: "error", message: "Something Went Wrong" });
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response === undefined) {
          setAlert({ type: "error", message: "Something Went Wrong" });
        } else if (error.response.status === 401) {
          // make a request to logout route here
          setAlert({ type: "error", message: error.response.data.response });
          setTimeout(() => {
            router.replace("/");
          }, 2000);
        } else if (error.response.status === 406) {
          formikHelpers.setErrors({ ...error.response.data.response });
          setAlert({ type: "error", message: "Kindly Resolve Form Errors" });
        } else if (error.response) {
          if (error.response.data.response !== undefined) {
            setAlert({
              type: "error",
              message: error.response.data.response,
            });
          } else {
            setAlert({
              type: "error",
              message: "Something Went Wrong",
            });
          }
          console.log(error.response, "second if else");
        } else {
          setAlert({ type: "error", message: "Something Went Wrong" });
          console.log(error, "third if else");
        }
      });
  };

  useEffect(() => {
    const savedValues = {
      coverLetter: [],
    };
    setFormValues(savedValues);
  }, []);
  return (
    <>
      <Stack sx={styles.topContainer} spacing={3}>
        <Formik
          validationSchema={fundRaising}
          initialValues={formValues || initialValues}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form>
                <FundRaisingContainer topLabel="Fund Raising">
                  <Stack direction={{ xs: "column" }} spacing={{ xs: 3 }}>
                    <FormikControl
                      control="singleFileUpload"
                      label="A covering letter from the committee stating the purpose of the Paybill and the Bank A/C details should be stated in the letter. At least two Committee officials to sign the letter"
                      name="coverLetter"
                      multiple={false}
                      givenFile={
                        formik.values.coverLetter !== undefined
                          ? formik.values.coverLetter[0]
                          : null
                      }
                    />
                  </Stack>

                  <LoadingButton
                    loading={loading}
                    variant="contained"
                    type="submit"
                    size="large"
                    sx={styles.submitButton}
                    disabled={
                      formik.values.coverLetter.length === 0 ||
                      formik.isSubmitting
                    }
                  >
                    Save
                  </LoadingButton>
                </FundRaisingContainer>
              </Form>
            );
          }}
        </Formik>
      </Stack>
      {alert.type !== "" && alert.message !== "" && (
        <MuiAlert variant={alert.type} message={alert.message} />
      )}
    </>
  );
};

FundRaising.propTypes = {
  handleNextStep: PropTypes.func.isRequired,
};

export default FundRaising;
