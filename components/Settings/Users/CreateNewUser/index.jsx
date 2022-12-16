import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";

import axios from "axios";
import Cookies from "js-cookie";

import { Box, Stack, useMediaQuery } from "@mui/material";

import { Formik, Form, yupToFormErrors, validateYupSchema } from "formik";

import FormikControl from "../../../FormikControls";

import MuiAlert from "../../../../atoms/MuiAlert";
import Loader from "../../../../atoms/Loader";
import PageViewBox from "../../../../atoms/PageViewBox";
import TransactionButton from "../../../../atoms/TransactionButton";

import Header from "./Header";

import { telephoneCodes } from "../../../../utils/data";
import { getTelephoneCountryCode } from "../../../../utils/countryOfOperation";
import { createUser } from "../../../../utils/formValidations/settings/users/createUser";
import { privilegesOptions, roleOptions, titleOptions } from "./data";

const initialValues = {
  title: "",
  firstName: "",
  surname: "",
  email: "",
  telephoneCountryCode: "KE",
  contactNumber: "",
  roleId: "",
  permissions: [],
};
const CreatePaymentLink = ({ toggleCreateUser }) => {
  const matches = useMediaQuery("(min-width:800px)");
  const router = useRouter();

  const [formValues, setFormValues] = useState(null);
  const [loading, setLoading] = useState(false);
  const [retrievalLoading, setRetrievalLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const companyRef = useSelector((state) => state.user.user.companyRef);

  const handleSubmit = (values, formikHelpers) => {
    console.log("companyRef::::::", companyRef);
    console.log(values);
    setLoading(true);
    setAlert({ type: "", message: "" });
    const credentials = Cookies.get("iPayT");

    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${companyRef}/create`,
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
            message: "Business Structure Details Updated Successfully!",
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
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/paymentLink/generate`,
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
      <Box sx={{ p: 15 }}>
        <PageViewBox>
          <Stack spacing={5} sx={{ pt: 10 }}>
            <Header toggleCreateUser={toggleCreateUser} />
            <Formik
              validate={(value) => {
                try {
                  validateYupSchema(value, createUser, true, value);
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
                      (matches && { pl: 25, pr: 25, pb: 8 }) || {
                        pl: 5,
                        pr: 5,
                        pb: 5,
                      }
                    }
                  >
                    <Form>
                      <Stack spacing={3}>
                        <FormikControl
                          control="select"
                          variant="outlined"
                          name="title"
                          label="Title"
                          type="text"
                          select
                          selectItem={titleOptions}
                          id="title"
                          required
                        />
                        <FormikControl
                          control="input"
                          label="First Name"
                          placholder="John"
                          name="firstName"
                          variant="outlined"
                          type="text"
                          id="firstName"
                          required
                          shrink
                        />
                        <FormikControl
                          control="input"
                          label="Surname"
                          placholder="Doe"
                          name="surname"
                          variant="outlined"
                          type="text"
                          id="surname"
                          required
                          shrink
                        />

                        <FormikControl
                          control="input"
                          label="Email"
                          placholder="john@doe.com"
                          name="email"
                          variant="outlined"
                          type="text"
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
                                formik.values?.telephoneCountryCode ||
                                  initialValues.telephoneCountryCode
                              )}
                            />
                          </Box>
                          <FormikControl
                            control="input"
                            variant="outlined"
                            name="contactNumber"
                            label="Contact Number"
                            type="number"
                            id="contactNumber"
                            required
                            haveTooltip
                            tooltipText="Enter Contact number without country code"
                          />
                        </Stack>

                        <FormikControl
                          control="select"
                          variant="outlined"
                          name="roleId"
                          label="Assign role"
                          type="text"
                          select
                          selectItem={roleOptions}
                          id="roleId"
                          required
                        />
                        <FormikControl
                          control="multiSelect"
                          variant="outlined"
                          name="permissions"
                          label="Assign Privileges"
                          type="text"
                          selectOptions={privilegesOptions}
                          id="permissions"
                          required
                        />

                        <Stack direction="row" spacing={2}>
                          <TransactionButton
                            text="Create User"
                            icon={<img src="/doubletick.svg" alt="icon" />}
                            activeState
                            type="submit"
                            loading={loading}
                          />
                          <TransactionButton
                            text="Cancel"
                            onClick={() => {
                              formik.resetForm();
                              return toggleCreateUser();
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
        </PageViewBox>
      </Box>
      {alert.type !== "" && alert.message !== "" && (
        <MuiAlert variant={alert.type} message={alert.message} />
      )}
    </>
  );
};

CreatePaymentLink.propTypes = {
  toggleCreateUser: PropTypes.func.isRequired,
};

export default CreatePaymentLink;
