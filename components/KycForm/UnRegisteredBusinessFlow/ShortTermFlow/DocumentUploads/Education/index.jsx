import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import PropTypes from "prop-types";

import axios from "axios";
import Cookies from "js-cookie";

import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";

import FormikControl from "../../../../../FormikControls/index";
import EducationContainer from "../../../../../../atoms/CreateAccountFormDiv";
import MuiAlert from "../../../../../../atoms/MuiAlert";

import { education } from "../../../../../../utils/formValidations/kyc/unRegisteredBusinessFlow/shortTermFlow/documentUploads/education";
import { styles } from "../styles";

const initialValues = {
  feeStructure: [],
  admissionLetter: [],
};

const Education = ({ handleNextStep }) => {
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
      feeStructure: [
        {
          file: { path: "elipa-Single-logos-black.png" },
          errors: [],
          id: 1,
          url: "https://res.cloudinary.com/demo/image/upload/v1648551450/docs_uploading_example/elipa-Single-logos-black_fqcxd1.png",
        },
      ],
      admissionLetter: [
        {
          file: { path: "elipa-Single-logos-black.png" },
          errors: [],
          id: 1,
          url: "https://res.cloudinary.com/demo/image/upload/v1648551450/docs_uploading_example/elipa-Single-logos-black_fqcxd1.png",
        },
      ],
    };

    setFormValues(savedValues);
  }, []);
  return (
    <>
      <Stack sx={styles.topContainer} spacing={3}>
        <Formik
          validationSchema={education}
          initialValues={formValues || initialValues}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {(formik) => {
            console.log(formik);
            return (
              <Form>
                <EducationContainer topLabel="Education">
                  <Stack direction={{ xs: "column" }} spacing={{ xs: 3 }}>
                    <FormikControl
                      control="singleFileUpload"
                      label="Fee Structure (Either Stamped Or On Institution Letter Head"
                      name="feeStructure"
                      multiple={false}
                      givenFile={
                        formik.values.feeStructure !== undefined
                          ? formik.values.feeStructure[0]
                          : null
                      }
                    />
                    <FormikControl
                      control="singleFileUpload"
                      label="Certified Admission Form On Letter Head"
                      name="admissionLetter"
                      multiple={false}
                      givenFile={
                        formik.values.admissionLetter !== undefined
                          ? formik.values.admissionLetter[0]
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
                      formik.values.feeStructure.length === 0 ||
                      formik.values.admissionLetter.length === 0 ||
                      formik.isSubmitting
                    }
                    // onClick={handleSubmit}  // can use this if we want to call handle submit even if there are form errors
                  >
                    Save
                  </LoadingButton>
                </EducationContainer>
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

Education.propTypes = {
  handleNextStep: PropTypes.func.isRequired,
};

export default Education;