import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useDispatch } from "react-redux";

import PropTypes from "prop-types";

import axios from "axios";
import Cookies from "js-cookie";

import { Stack, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";
import FormikControl from "../../../../FormikControls";
import CreateAccountFormDiv from "../../../../../atoms/CreateAccountFormDiv";
import MuiAlert from "../../../../../atoms/MuiAlert";
import Loader from "../../../../../atoms/Loader";

import { personalDetails } from "../../../../../utils/formValidations/kyc/unRegisteredBusinessFlow/shortTermFlow/personalDetails";
import { telephoneCodes } from "../../../../../utils/data";

import { titleOptions, genderOptions, documentTypeOptions } from "./data";

import { fetchKycStatusSuccess } from "../../../../../redux";

import * as styles from "./styles";

const initialValues = {
  businessRepresentative: {
    title: "",
    surname: "",
    firstName: "",
    middleName: "",
    telephoneCountryCode: "",
    contactNumber: "",
    email: "",
    gender: "",
    dateOfBirth: null,
    countryOfOperation: "KE",
    documentType: "1",
    documentNumber: "",
    taxPinNumber: "",
    nationalIdFront: [],
    nationalIdBack: [],
    passport: [],
    passportSizePhoto: [],
    pinCertificate: [],
  },
  businessLocation: {
    physicalAddress: "",
    postalAddress: "",
    postalcode: "",
    city: "",
    county: "",
    websiteLink: "",
    appDownloadLink: "",
  },
};

const PersonalDetailsForm = ({ handleNextStep }) => {
  const router = useRouter();
  const dispatch = useDispatch();

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
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/kyc/businessStructure`,
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
            message: "Personal Details Updated Successfully!",
          });
          setLoading(false);
          dispatch(fetchKycStatusSuccess(response.data.response.kycStatus));
          handleNextStep();
        } else {
          console.log(response, "response0");
          setAlert({ type: "error", message: "Something Went Wrong" });
          setLoading(false);
          formikHelpers.setSubmitting(false);
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
        setLoading(false);
        formikHelpers.setSubmitting(false);
      });
  };

  useEffect(() => {
    setRetrievalLoading(true);
    const credentials = Cookies.get("iPayT");
    const config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/kyc/businessStructure`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials}`,
      },
      withCredentials: true,
    };
    axios(config)
      .then((response) => {
        console.log(response, "response");
        if (response.data.success === true) {
          setRetrievalLoading(false);
          setFormValues(response.data.response);
        } else {
          console.log(response, "response0");
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
          console.log(error.response, "second if else");
        } else {
          setAlert({ type: "error", message: "Something Went Wrong" });
          console.log(error, "third if else");
        }
        setRetrievalLoading(false);
      });
  }, []);

  if (retrievalLoading) {
    return <Loader spaceAround="md" alignment={{ height: "65vh" }} />;
  }

  return (
    <>
      <Stack sx={{ padding: "2.5rem 0 0 0" }} spacing={1}>
        <Formik
          initialValues={formValues || initialValues}
          validationSchema={personalDetails}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {(formik) => {
            console.log(formik.errors, "aasa");
            return (
              <Form>
                <Stack spacing={8}>
                  <CreateAccountFormDiv topLabel="Personal Information">
                    <Stack direction="column" spacing={2}>
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={3}
                      >
                        <Stack
                          sx={{
                            width: "100%",
                          }}
                          direction={{ xs: "row" }}
                          spacing={3}
                        >
                          <Box sx={{ width: { xs: "140px", sm: "128px" } }}>
                            <FormikControl
                              control="select"
                              variant="outlined"
                              name="businessRepresentative.title"
                              label="Title"
                              type="text"
                              select
                              selectItem={titleOptions}
                              id="title"
                              required
                            />
                          </Box>
                          <FormikControl
                            control="input"
                            label="Surname"
                            name="businessRepresentative.surname"
                            variant="outlined"
                            type="text"
                            id="surname"
                            required
                          />
                        </Stack>
                        <FormikControl
                          control="input"
                          label="First Name"
                          name="businessRepresentative.firstName"
                          variant="outlined"
                          type="text"
                          id="firstName"
                          required
                        />
                        <FormikControl
                          control="input"
                          label="Middle Name"
                          name="businessRepresentative.middleName"
                          variant="outlined"
                          type="text"
                          id="middleName"
                        />
                      </Stack>
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={3}
                      >
                        <Stack
                          sx={{
                            width: "100%",
                          }}
                          direction={{ xs: "row" }}
                          spacing={3}
                        >
                          <Box sx={{ width: "100px" }}>
                            <FormikControl
                              control="autocomplete"
                              name="businessRepresentative.telephoneCountryCode"
                              label="Code"
                              use="telephoneCountryCode"
                              options={telephoneCodes}
                              required
                              defaultValue={{
                                value: "KE",
                                label: "Kenya",
                                key: "254",
                              }}
                            />
                          </Box>
                          <FormikControl
                            control="input"
                            variant="outlined"
                            name="businessRepresentative.contactNumber"
                            label="Contact Number"
                            type="number"
                            id="contactNumber"
                            required
                            haveTooltip
                            tooltipText="Enter Your Contact number without country code"
                          />
                        </Stack>
                        <FormikControl
                          control="input"
                          label="Email"
                          name="businessRepresentative.email"
                          variant="outlined"
                          type="text"
                          id="email"
                          required
                        />
                      </Stack>
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={3}
                      >
                        <FormikControl
                          control="input"
                          variant="outlined"
                          name="businessRepresentative.gender"
                          label="Gender"
                          type="text"
                          id="gender"
                          select
                          selectItem={genderOptions}
                          required
                        />
                        <FormikControl
                          control="datePicker"
                          label="Date Of Birth"
                          name="businessRepresentative.dateOfBirth"
                          required
                          onChange={(val) => {
                            formik.setFieldValue(
                              "businessRepresentative.dateOfBirth",
                              val
                            );
                          }}
                        />
                        <FormikControl
                          control="input"
                          variant="outlined"
                          name="businessRepresentative.countryOfOperation"
                          label="Country Of Operation"
                          type="text"
                          id="countryOfOperation"
                          required
                          disabled
                        />
                      </Stack>
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={3}
                      >
                        <FormikControl
                          control="input"
                          variant="outlined"
                          name="businessRepresentative.documentType"
                          label="Document Type"
                          type="text"
                          id="documentType"
                          required
                          select
                          selectItem={documentTypeOptions}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "businessRepresentative.documentType",
                              e.target.value
                            );
                            formik.setFieldValue(
                              "businessRepresentative.documentNumber",
                              ""
                            );
                            formik.setFieldValue(
                              "businessRepresentative.passport",
                              []
                            );

                            formik.setFieldValue(
                              "businessRepresentative.nationalIdFront",
                              []
                            );
                            formik.setFieldValue(
                              "businessRepresentative.nationalIdBack",
                              []
                            );
                          }}
                        />
                        <FormikControl
                          control="input"
                          variant="outlined"
                          name="businessRepresentative.documentNumber"
                          label="Document Number"
                          type="text"
                          id="documentNumber"
                          required
                        />
                        <FormikControl
                          control="input"
                          variant="outlined"
                          name="businessRepresentative.taxPinNumber"
                          label="Tax PIN Number"
                          type="text"
                          id="taxPinNumber"
                          required
                        />
                      </Stack>
                      {formik.values.businessRepresentative.documentType ===
                        "1" && (
                        <Stack direction={{ xs: "column" }} spacing={3}>
                          <FormikControl
                            control="singleFileUpload"
                            label="National Id  (front)"
                            name="businessRepresentative.nationalIdFront"
                            multiple={false}
                            required
                            givenFile={
                              formik.values.businessRepresentative
                                .nationalIdFront !== undefined
                                ? formik.values.businessRepresentative
                                    .nationalIdFront[0]
                                : null
                            }
                          />
                          <FormikControl
                            control="singleFileUpload"
                            label="National Id (Back)"
                            name="businessRepresentative.nationalIdBack"
                            multiple={false}
                            required
                            givenFile={
                              formik.values.businessRepresentative
                                .nationalIdBack !== undefined
                                ? formik.values.businessRepresentative
                                    .nationalIdBack[0]
                                : null
                            }
                          />
                        </Stack>
                      )}
                      {formik.values.businessRepresentative.documentType ===
                        "2" && (
                        <Stack direction={{ xs: "column" }} spacing={3}>
                          <FormikControl
                            control="singleFileUpload"
                            label="Passport Copy"
                            name="businessRepresentative.passport"
                            multiple={false}
                            required
                            givenFile={
                              formik.values.businessRepresentative.passport !==
                              undefined
                                ? formik.values.businessRepresentative
                                    .passport[0]
                                : null
                            }
                          />
                        </Stack>
                      )}
                      <Stack direction={{ xs: "column" }} spacing={3}>
                        <FormikControl
                          control="singleFileUpload"
                          label="Colored Passport Size Photograph"
                          name="businessRepresentative.passportSizePhoto"
                          multiple={false}
                          required
                          givenFile={
                            formik.values.businessRepresentative
                              .passportSizePhoto !== undefined
                              ? formik.values.businessRepresentative
                                  .passportSizePhoto[0]
                              : null
                          }
                        />
                        <FormikControl
                          control="singleFileUpload"
                          label="Tax PIN certificate"
                          name="businessRepresentative.pinCertificate"
                          multiple={false}
                          required
                          givenFile={
                            formik.values.businessRepresentative
                              .pinCertificate !== undefined
                              ? formik.values.businessRepresentative
                                  .pinCertificate[0]
                              : null
                          }
                        />
                      </Stack>
                    </Stack>
                  </CreateAccountFormDiv>
                  <CreateAccountFormDiv topLabel="Address">
                    <Stack direction="column" spacing={2}>
                      <Stack
                        spacing={3}
                        direction={{ xs: "column", md: "row" }}
                      >
                        <FormikControl
                          control="input"
                          variant="outlined"
                          name="businessLocation.physicalAddress"
                          label="Physical Address (Street/Road/Building)"
                          type="text"
                          id="physicalAddress"
                          required
                        />
                        <FormikControl
                          control="input"
                          variant="outlined"
                          name="businessLocation.postalAddress"
                          label="Postal Address"
                          type="text"
                          id="postalAddress"
                          required
                        />
                      </Stack>
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={3}
                      >
                        <FormikControl
                          control="input"
                          variant="outlined"
                          name="businessLocation.postalCode"
                          label="Postal Code"
                          type="number"
                          id="postalCode"
                          required
                        />
                        <FormikControl
                          control="input"
                          variant="outlined"
                          name="businessLocation.city"
                          label="City/Town"
                          type="text"
                          id="city"
                          required
                        />
                      </Stack>
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={3}
                        justifyContent="space-between"
                      >
                        <FormikControl
                          control="input"
                          variant="outlined"
                          name="businessLocation.county"
                          label="County"
                          type="text"
                          id="county"
                        />
                        <FormikControl
                          control="input"
                          variant="outlined"
                          name="businessLocation.websiteLink"
                          label="Business Website Link"
                          type="text"
                          id="websiteLink"
                          required
                        />
                      </Stack>
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={3}
                      >
                        <FormikControl
                          control="input"
                          variant="outlined"
                          name="businessLocation.appDownloadLink"
                          label="Business App Download Link"
                          type="text"
                          id="appLink"
                        />
                      </Stack>
                    </Stack>
                  </CreateAccountFormDiv>
                  <LoadingButton
                    loading={loading}
                    variant="contained"
                    type="submit"
                    size="large"
                    sx={styles.saveAndNextButton}
                    disabled={!formik.isValid}
                  >
                    Save & Next
                  </LoadingButton>
                </Stack>
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

PersonalDetailsForm.propTypes = {
  handleNextStep: PropTypes.func.isRequired,
};

export default PersonalDetailsForm;

export const getServerSideProps = async (context) => {
  const data = "";
  return {
    props: {
      data,
    },
  };
};
