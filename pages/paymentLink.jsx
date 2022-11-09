import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import axios from "axios";
import Cookies from "js-cookie";

import { Box, Stack, useMediaQuery, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form, yupToFormErrors, validateYupSchema } from "formik";

import FormikControl from "../components/FormikControls/index";

import MuiAlert from "../atoms/MuiAlert";
import Loader from "../atoms/Loader";
import PageViewBox from "../atoms/PageViewBox";

import { telephoneCodes } from "../utils/data";
import { getTelephoneCountryCode } from "../utils/countryOfOperation";
import { generateGatewayLink } from "../utils/formValidations/paymentLink/generateGatewayLink";

const initialValues = {
  name: "",
  email: "",
  telephoneCountryCode: "KE",
  phoneNumber: "",
  amount: "",
};
const CreatePaymentLink = () => {
  const matches = useMediaQuery("(min-width:1225px)");
  const router = useRouter();

  const [formValues, setFormValues] = useState(null);
  const [loading, setLoading] = useState(false);
  const [retrievalLoading, setRetrievalLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleSubmit = (values, formikHelpers) => {
    setLoading(true);
    setAlert({ type: "", message: "" });
    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/paymentLink/generate-gateway-link`,
      headers: {
        "Content-Type": "application/json",
        "Device-Channel": "web",
      },
      data: JSON.stringify(values),
      withCredentials: true,
    };
    axios(config)
      .then((response) => {
        console.log(response.data.success, "sss");
        if (response.data.success === true) {
          console.log("here", "sss");
          window.open(response.data.response, "_self");
        } else {
          setAlert({ type: "error", message: "Something Went Wrong" });
        }
        formikHelpers.setSubmitting(false);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        formikHelpers.setSubmitting(false);

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
        } else {
          setAlert({ type: "error", message: "Something Went Wrong" });
        }
      });
  };

  useEffect(() => {
    setRetrievalLoading(true);
    const credentials = Cookies.get("iPayT");

    const config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/paymentLink/create`,
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
          setRetrievalLoading(false);
          setFormValues(response.data.response);
          console.log(response.data.response, "dddddblablabla");
          setFormValues(response.data.response);
        } else {
          setAlert({ type: "error", message: "Something Went Wrong" });
          setRetrievalLoading(false);
        }
      })
      .catch((error) => {
        setRetrievalLoading(false);
        if (error.response === undefined) {
          setAlert({ type: "error", message: "Something Went Wrong" });
        } else if (error.response.status === 401) {
          // make a request to logout route here
          setAlert({ type: "error", message: error.response.data.response });
          setTimeout(() => {
            router.replace("/");
          }, 2000);
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
        } else {
          setAlert({ type: "error", message: "Something Went Wrong" });
        }
        setRetrievalLoading(false);
      });
  }, []);

  if (retrievalLoading) {
    return <Loader spaceAround="md" alignment={{ height: "65vh" }} />;
  }

  return (
    <>
      <Box
        sx={
          (matches && { pt: 10, pl: 110, pr: 110, pb: 8 }) || {
            pt: 10,
            pl: 5,
            pr: 5,
            pb: 5,
          }
        }
      >
        <PageViewBox>
          <Stack spacing={5} sx={{ pt: 10 }}>
            <Stack
              justifyContent="center"
              alignItems="center"
              spacing={3}
              sx={{ pl: 10, pr: 10 }}
            >
              <Typography
                variant="title6"
                sx={{
                  color: (theme) => theme.colors.blue,
                  textAlign: "center",
                }}
              >
                Edge City Communications Limited has requested payment for Order
                #8w27l9
              </Typography>
            </Stack>
            <Stack
              justifyContent="center"
              alignItems="center"
              spacing={3}
              sx={{ pt: 5, pb: 5, background: "#F8F9FF" }}
            >
              <Typography
                variant="title6"
                sx={{ color: (theme) => theme.colors.orange }}
              >
                KES 304
              </Typography>
              <Typography variant="subtitle2">Payment For</Typography>
              <Typography variant="title3">bla bla ablanblabla</Typography>
            </Stack>
            <Formik
              validate={(value) => {
                try {
                  validateYupSchema(value, generateGatewayLink, true, value);
                } catch (err) {
                  return yupToFormErrors(err);
                }
                return {};
              }}
              initialValues={initialValues}
              enableReinitialize
              onSubmit={handleSubmit}
            >
              {(formik) => {
                return (
                  <Box
                    sx={
                      (matches && { pl: 10, pr: 10 }) || {
                        pl: 5,
                        pr: 5,
                      }
                    }
                  >
                    <Stack
                      justifyContent="center"
                      alignItems="center"
                      sx={{ pt: 5, pb: 5 }}
                    >
                      <Typography variant="title2">
                        Verify Your details to pay
                      </Typography>
                    </Stack>
                    <Form>
                      <Stack spacing={3}>
                        <Stack direction={{ xs: "column" }} spacing={2}>
                          <FormikControl
                            control="input"
                            label="Customer Name"
                            name="name"
                            variant="outlined"
                            type="text"
                            id="name"
                            placeholder="John doe"
                            shrink
                          />
                          <FormikControl
                            control="input"
                            label="Customer Email"
                            name="email"
                            variant="outlined"
                            type="text"
                            id="email"
                            placeholder="johndoe@johndoe.com"
                            shrink
                          />
                          <FormikControl
                            control="input"
                            label={`Amount In KES`}
                            placholder="0"
                            name="amount"
                            variant="outlined"
                            type="number"
                            id="amount"
                            required
                            shrink
                          />
                        </Stack>
                        <Stack
                          sx={{
                            width: "100%",
                          }}
                          direction={{ xs: "row" }}
                          spacing={3}
                        >
                          <Box sx={{ width: "130px" }}>
                            <FormikControl
                              control="autocomplete"
                              name="telephoneCountryCode"
                              label="Code"
                              use="telephoneCountryCode"
                              options={telephoneCodes}
                              required
                              defaultValue={getTelephoneCountryCode(
                                formValues?.telephoneCountryCode || "KE"
                              )}
                            />
                          </Box>
                          <FormikControl
                            control="input"
                            variant="outlined"
                            name="phoneNumber"
                            label="Contact Number"
                            type="number"
                            id="phoneNumber"
                            haveTooltip
                            tooltipText="Enter Your Contact number without country code"
                          />
                        </Stack>

                        <LoadingButton
                          loading={loading}
                          variant="contained"
                          type="submit"
                          size="large"
                          sx={{
                            width: "100%",
                            mt: 5,
                            color: "white",
                            backgroundColor: (theme) => theme.colors.blue,
                          }}
                          disabled={!formik.isValid}
                        >
                          PROCEED TO PAYMENT PAGE
                        </LoadingButton>
                      </Stack>
                      <Stack justifyContent="center" alignItems="center">
                        <Typography variant="title1">
                          Secured by{" "}
                          {router.query.country === "ke" ? "iPay" : "eLipa"}
                        </Typography>
                      </Stack>
                    </Form>
                  </Box>
                );
              }}
            </Formik>
          </Stack>
        </PageViewBox>
      </Box>
      {alert.type !== "" && alert.message !== "" && (
        <MuiAlert variant={alert.type} message={alert.message} />
      )}
    </>
  );
};

export default CreatePaymentLink;
