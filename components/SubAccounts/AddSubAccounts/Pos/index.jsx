import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import PropTypes from "prop-types";

import axios from "axios";
import Cookies from "js-cookie";

import { useSelector } from "react-redux";

import { Box, Stack, useMediaQuery, Typography } from "@mui/material";

import { Formik, Form, yupToFormErrors, validateYupSchema } from "formik";

import FormikControl from "../../../FormikControls";

import MuiAlert from "../../../../atoms/MuiAlert";
import Loader from "../../../../atoms/Loader";

import TransactionButton from "../../../../atoms/TransactionButton";

import { telephoneCodes } from "../../../../utils/data";
import { getTelephoneCountryCode } from "../../../../utils/countryOfOperation";
import { pos } from "../../../../utils/formValidations/subAccounts/addSubAccounts/pos";

const initialValues = {
  subAccountId: "",
  subAccountName: "",
  email: "",
  telephoneCountryCode: "KE",
  phoneNumber: "",
  helplineTelephoneCountryCode: "KE",
  helpline: "",
  reference: "",
  callbackUrl: "",
  mode: "pos",
  securityKey: "xxx",
};
const Pos = ({ closeAddSubAccounts }) => {
  const matches = useMediaQuery("(min-width:800px)");
  const router = useRouter();

  const companyRef = useSelector((state) => state.user.user.companyRef);

  const [formValues, setFormValues] = useState(null);
  const [loading, setLoading] = useState(false);
  const [retrievalLoading, setRetrievalLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleSubmit = (values, formikHelpers) => {
    setLoading(true);
    setAlert({ type: "", message: "" });
    const credentials = Cookies.get("iPayT");
    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/subs/${companyRef}/create`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials}`,
        "Device-Channel": "web",
      },
      data: JSON.stringify(values),
      withCredentials: true,
    };
    axios(config)
      .then((response) => {
        if (response.data.success === true) {
          setAlert({
            type: "success",
            message: "Sub Account Added Successfully!",
          });
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
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/subs/bdf4bbc8-f019-46e1-8a35-081510d6b9a3/create`,
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
      <Stack spacing={5} sx={{ pt: 6 }}>
        <Formik
          validate={(value) => {
            try {
              validateYupSchema(value, pos, true, value);
            } catch (err) {
              return yupToFormErrors(err);
            }
            return {};
          }}
          initialValues={initialValues || formValues}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {(formik) => {
            return (
              <Box
                sx={
                  (matches && { pl: 12, pr: 12, pb: 8 }) || {
                    pl: 5,
                    pr: 5,
                    pb: 5,
                  }
                }
              >
                <Box sx={{ mb: 10 }}>
                  <Typography
                    variant="subtitle5"
                    sx={{ color: (theme) => theme.colors.blue }}
                  >
                    Add POS Sub Accont
                  </Typography>
                </Box>
                <Form>
                  <Stack spacing={3}>
                    <FormikControl
                      control="input"
                      label="Sub Account Id"
                      placholder="Enter Sub Account ID eg subaccount"
                      name="subAccountId"
                      variant="outlined"
                      type="text"
                      id="subAccountId"
                      required
                      shrink
                    />

                    <FormikControl
                      control="input"
                      label="Sub Account Name"
                      placholder="Enter Name of the business branch e.g My Shop Limited"
                      name="subAccountName"
                      variant="outlined"
                      type="text"
                      id="subAccountName"
                      required
                      shrink
                    />

                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="email"
                      label="Email"
                      type="text"
                      placeholder="email@example.com"
                      id="email"
                      required
                      shrink
                    />
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
                            formValues?.telephoneCountryCode ||
                              initialValues?.telephoneCountryCode
                          )}
                        />
                      </Box>
                      <FormikControl
                        control="input"
                        variant="outlined"
                        name="phoneNumber"
                        label="Phone Number"
                        type="number"
                        id="phoneNumber"
                        placeholder="79xxxxxxx"
                        required
                        shrink
                        haveTooltip
                        tooltipText="Enter Your Contact number without country code"
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
                          name="helplineTelephoneCountryCode"
                          label="Code"
                          use="telephoneCountryCode"
                          options={telephoneCodes}
                          required
                          defaultValue={getTelephoneCountryCode(
                            formValues?.helplineTelephoneCountryCode ||
                              initialValues?.helplineTelephoneCountryCode
                          )}
                        />
                      </Box>
                      <FormikControl
                        control="input"
                        variant="outlined"
                        name="helpline"
                        label="Helpline"
                        type="number"
                        id="helpline"
                        shrink
                        required
                        haveTooltip
                        placeholder="79xxxxxxx"
                        tooltipText="Enter Helpline without country code"
                      />
                    </Stack>
                    <FormikControl
                      control="input"
                      label="Reference"
                      name="reference"
                      variant="outlined"
                      type="text"
                      id="reference"
                      placeholder="Enter Reference e.g ID Number"
                      shrink
                    />

                    <FormikControl
                      control="input"
                      label="Callback URL"
                      name="callbackUrl"
                      variant="outlined"
                      type="text"
                      id="callbackUrl"
                      placeholder="http://example.com/callback"
                      required
                      shrink
                    />

                    <FormikControl
                      control="input"
                      label="Security Key"
                      name="securityKey"
                      variant="outlined"
                      type="text"
                      id="securityKey"
                      placeholder="Random custom string to be used to sign the POS callback data"
                      disabled
                      required
                      shrink
                    />

                    <Stack direction="row" spacing={2} sx={{ pt: 10 }}>
                      <TransactionButton
                        text="Create SubAccount"
                        icon={<img src="/doubletick.svg" alt="icon" />}
                        activeState
                        type="submit"
                        loading={loading}
                      />
                      <TransactionButton
                        text="Cancel"
                        onClick={() => {
                          formik.resetForm();
                          return closeAddSubAccounts();
                        }}
                      />
                    </Stack>
                  </Stack>
                </Form>
              </Box>
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

Pos.propTypes = {
  closeAddSubAccounts: PropTypes.func.isRequired,
};

export default Pos;
