import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import PropTypes from "prop-types";

import axios from "axios";
import Cookies from "js-cookie";

import { Stack, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";
import FormikControl from "../../../../FormikControls";
import CreateAccountFormDiv from "../../../../../atoms/CreateAccountFormDiv";
import MuiAlert from "../../../../../atoms/MuiAlert";

import { personalDetails } from "../../../../../utils/formValidations/kyc/unRegisteredBusinessFlow/shortTermFlow/personalDetails";

import {
  signUpDurationOptions,
  purposeOptions,
  titleOptions,
  genderOptions,
  maritalStatusOptions,
  documentTypeOptions,
  telephoneCodes,
} from "./data";

import * as styles from "./styles";

const initialValues = {
  personalInformation: {
    title: "",
    surname: "",
    firstName: "",
    middleName: "",
    telephoneCountryCode: "",
    contactNumber: "",
    email: "",
    gender: "",
    maritalStatus: "",
    dateOfBirth: null,
    countryOfOperation: "Kenya",
    documentType: "1",
    documentNumber: "",
    taxPinNumber: "",
    nationalIdFront: [],
    nationalIdBack: [],
    passport: [],
    passportSizePhoto: [],
    pinCertificate: [],
  },
  // plan: {
  //    signUpDuration: "",
  //    purpose: "",
  //   description: "",
  // },
  businessLocation: {
    physicalAddress: "This is my physical address",
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

  const [formValues, setFormValues] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleSubmit = (values, formikHelpers) => {
    setLoading(true);
    setAlert({ type: "", message: "" });
    const credentials = Cookies.get("iPayT");
    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/kyc/biz-structure`,
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
            message: "Bank Details Updated Successfully!",
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
        setLoading(false);
      });
  };

  useEffect(() => {
    const savedValues = {
      // this you get it from api call
      personalInformation: {
        title: "",
        surname: "",
        firstName: "",
        middleName: "",
        telephoneCountryCode: "",
        contactNumber: "",
        email: "",
        gender: "",
        maritalStatus: "",
        dateOfBirth: null,
        countryOfOperation: "Ke",
        documentType: "1",
        documentNumber: "",
        taxPinNumber: "",
        nationalIdFront: [
          {
            file: { path: "elipa-Single-logos-black.png" },
            errors: [],
            id: 1,
            url: "https://res.cloudinary.com/demo/image/upload/v1648551450/docs_uploading_example/elipa-Single-logos-black_fqcxd1.png",
          },
        ],
        nationalIdBack: [],
        passport: [],
        passportSizePhoto: [],
        pinCertificate: [],
      },
      // plan: {
      //    signUpDuration: "",
      //    purpose: "",
      //   description: "",
      // },
      businessLocation: {
        physicalAddress: "This is my physical address",
        postalAddress: "",
        postalcode: "",
        city: "",
        county: "",
        websiteLink: "",
        appDownloadLink: "",
      },
    };
    setFormValues(savedValues);
  }, []);

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
            console.log(formik.errors);
            return (
              <Form>
                <Stack sx={styles.formContainer} spacing={8}>
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
                          <Box sx={{ width: "110px" }}>
                            <FormikControl
                              control="select"
                              variant="outlined"
                              name="personalInformation.title"
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
                            name="personalInformation.surname"
                            variant="outlined"
                            type="text"
                            id="surname"
                            required
                          />
                        </Stack>
                        <FormikControl
                          control="input"
                          label="First Name"
                          name="personalInformation.firstName"
                          variant="outlined"
                          type="text"
                          id="firstName"
                          required
                        />
                        <FormikControl
                          control="input"
                          label="Middle Name"
                          name="personalInformation.middleName"
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
                              control="input"
                              name="personalInformation.telephoneCountryCode"
                              label="Code"
                              type="text"
                              select
                              selectItem={telephoneCodes}
                              id="telephoneCountryCode"
                              required
                              defaultValue={formik.values.personalInformation.countryOfOperation.toUpperCase()}
                            />
                          </Box>
                          <FormikControl
                            control="input"
                            variant="outlined"
                            name="personalInformation.contactNumber"
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
                          name="personalInformation.email"
                          variant="outlined"
                          type="text"
                          id="email"
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
                          name="personalInformation.gender"
                          label="Gender"
                          type="text"
                          id="gender"
                          select
                          selectItem={genderOptions}
                          required
                        />
                        <FormikControl
                          control="input"
                          variant="outlined"
                          name="personalInformation.maritalStatus"
                          label="Marital Status"
                          type="text"
                          id="marital Status"
                          select
                          selectItem={maritalStatusOptions}
                          required
                        />
                      </Stack>
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={3}
                      >
                        <FormikControl
                          control="datePicker"
                          label="Date Of Birth"
                          name="personalInformation.dateOfBirth"
                          required
                          onChange={(val) => {
                            formik.setFieldValue(
                              "personalInformation.dateOfBirth",
                              val
                            );
                          }}
                        />
                        <FormikControl
                          control="input"
                          variant="outlined"
                          name="personalInformation.countryOfOperation"
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
                          name="personalInformation.documentType"
                          label="Document Type"
                          type="text"
                          id="documentType"
                          required
                          select
                          selectItem={documentTypeOptions}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "personalInformation.documentType",
                              e.target.value
                            );
                            formik.setFieldValue(
                              "personalInformation.documentNumber",
                              ""
                            );
                            formik.setFieldValue(
                              "personalInformation.passport",
                              []
                            );

                            formik.setFieldValue(
                              "personalInformation.nationalIdFront",
                              []
                            );
                            formik.setFieldValue(
                              "personalInformation.nationalIdBack",
                              []
                            );
                          }}
                        />
                        <FormikControl
                          control="input"
                          variant="outlined"
                          name="personalInformation.documentNumber"
                          label="Document Number"
                          type="text"
                          id="documentNumber"
                          required
                        />
                        <FormikControl
                          control="input"
                          variant="outlined"
                          name="personalInformation.taxPinNumber"
                          label="Tax PIN Number"
                          type="text"
                          id="taxPinNumber"
                          required
                        />
                      </Stack>
                      {formik.values.personalInformation.documentType ===
                        "1" && (
                        <Stack direction={{ xs: "column" }} spacing={3}>
                          <FormikControl
                            control="singleFileUpload"
                            label="National Id  (front)"
                            name="personalInformation.nationalIdFront"
                            multiple={false}
                            required
                            givenFile={
                              formik.values.personalInformation
                                .nationalIdFront !== undefined
                                ? formik.values.personalInformation
                                    .nationalIdFront[0]
                                : null
                            }
                          />
                          <FormikControl
                            control="singleFileUpload"
                            label="National Id (Back)"
                            name="personalInformation.nationalIdBack"
                            multiple={false}
                            required
                            givenFile={
                              formik.values.personalInformation
                                .nationalIdBack !== undefined
                                ? formik.values.personalInformation
                                    .nationalIdBack[0]
                                : null
                            }
                          />
                        </Stack>
                      )}
                      {formik.values.personalInformation.documentType ===
                        "2" && (
                        <Stack direction={{ xs: "column" }} spacing={3}>
                          <FormikControl
                            control="singleFileUpload"
                            label="Passport Copy"
                            name="personalInformation.passport"
                            multiple={false}
                            required
                            givenFile={
                              formik.values.personalInformation.passport !==
                              undefined
                                ? formik.values.personalInformation.passport[0]
                                : null
                            }
                          />
                        </Stack>
                      )}
                      <Stack direction={{ xs: "column" }} spacing={3}>
                        <FormikControl
                          control="singleFileUpload"
                          label="Colored Passport Size Photograph"
                          name="personalInformation.passportSizePhoto"
                          multiple={false}
                          required
                          givenFile={
                            formik.values.personalInformation
                              .passportSizePhoto !== undefined
                              ? formik.values.personalInformation
                                  .passportSizePhoto[0]
                              : null
                          }
                        />
                        <FormikControl
                          control="singleFileUpload"
                          label="Tax PIN certificate"
                          name="personalInformation.pinCertificate"
                          multiple={false}
                          required
                          givenFile={
                            formik.values.personalInformation.pinCertificate !==
                            undefined
                              ? formik.values.personalInformation
                                  .pinCertificate[0]
                              : null
                          }
                        />
                      </Stack>
                    </Stack>
                  </CreateAccountFormDiv>
                  {/* <CreateAccountFormDiv topLabel="Plan">
                    <Stack direction="column" spacing={2}>
                      <FormikControl
                        control="select"
                        variant="outlined"
                        name="plan.signUpDuration"
                        label="Sign Up Duration"
                        type="text"
                        select
                        selectItem={signUpDurationOptions}
                        id="signUpDuration"
                        required
                      />
                      {formik.values.plan.signUpDuration === "1" && (
                        <FormikControl
                          control="select"
                          variant="outlined"
                          name="plan.purpose"
                          label="Purpose"
                          type="text"
                          select
                          selectItem={purposeOptions}
                          id="purpose"
                          required
                        />
                      )}
                      {formik.values.plan.signUpDuration === "2" && (
                        <FormikControl
                          control="input"
                          variant="outlined"
                          name="plan.description"
                          label="Business Description"
                          type="text"
                          id="description"
                          multiline
                          required
                          haveTooltip
                          tooltipText="Describe the nature Of Business"
                        />
                      )}
                      <FormikControl
                        control="input"
                        variant="outlined"
                        name="plan.description"
                        label="Business Description"
                        type="text"
                        id="description"
                        multiline
                        required
                        haveTooltip
                        tooltipText="Describe the nature Of Business"
                      />
                    </Stack>
                  </CreateAccountFormDiv> */}
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
