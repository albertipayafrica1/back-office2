import { useEffect, useState } from "react";

import { Stack, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";
import FormikControl from "../../../FormikControls";
import CreateAccountFormDiv from "../../../../atoms/CreateAccountFormDiv";
import { personalDetails } from "../../../../utils/formValidations/kyc/unRegisteredBusinessFlow/personalDetails";

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
  plan: {
    signUpDuration: "",
    purpose: "",
    description: "",
  },
  address: {
    physicalAddress: "This is my physical address",
    postalAddress: "",
    postalcode: "",
    city: "",
    county: "",
    websiteLink: "",
    appDownloadLink: "",
  },
};

const BusinessStructureForm = (data) => {
  const [formValues, setFormValues] = useState(null);

  const handleSubmit = (values, formikHelpers) => {
    console.log(values, "formValues");
    console.log(formikHelpers, "formikhlpers");
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
      plan: {
        signUpDuration: "",
        purpose: "",
        description: "",
      },
      address: {
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

  const loading = false;

  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={personalDetails}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {(formik) => {
        // console.log(formik.errors,"forkss")
        return (
          <Form>
            <Stack sx={styles.formContainer} spacing={8}>
              <CreateAccountFormDiv topLabel="Personal Information">
                <Stack direction="column" spacing={2}>
                  <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
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
                  <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
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
                  <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
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
                  <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
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
                  {formik.values.personalInformation.documentType === "1" && (
                    <Stack direction={{ xs: "column" }} spacing={3}>
                      <FormikControl
                        control="singleFileUpload"
                        label="National Id  (front)"
                        name="personalInformation.nationalIdFront"
                        multiple={false}
                        required
                        givenFile={
                          formik.values.personalInformation.nationalIdFront !==
                          undefined
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
                          formik.values.personalInformation.nationalIdBack !==
                          undefined
                            ? formik.values.personalInformation
                                .nationalIdBack[0]
                            : null
                        }
                      />
                    </Stack>
                  )}
                  {formik.values.personalInformation.documentType === "2" && (
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
                        formik.values.personalInformation.passportSizePhoto !==
                        undefined
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
                          ? formik.values.personalInformation.pinCertificate[0]
                          : null
                      }
                    />
                  </Stack>
                </Stack>
              </CreateAccountFormDiv>
              <CreateAccountFormDiv topLabel="Plan">
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
                </Stack>
              </CreateAccountFormDiv>
              <CreateAccountFormDiv topLabel="Address">
                <Stack direction="column" spacing={2}>
                  <Stack spacing={3} direction={{ xs: "column", md: "row" }}>
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="address.physicalAddress"
                      label="Physical Address (Street/Road/Building)"
                      type="text"
                      id="physicalAddress"
                      required
                    />
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="address.postalAddress"
                      label="Postal Address"
                      type="text"
                      id="postalAddress"
                      required
                    />
                  </Stack>
                  <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="address.postalCode"
                      label="Postal Code"
                      type="number"
                      id="postalCode"
                      required
                    />
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="address.city"
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
                      name="address.county"
                      label="County"
                      type="text"
                      id="county"
                    />
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="address.websiteLink"
                      label="Business Website Link"
                      type="text"
                      id="websiteLink"
                    />
                  </Stack>
                  <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="address.appDownloadLink"
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
  );
};

export default BusinessStructureForm;

export const getServerSideProps = async (context) => {
  const data = "";
  return {
    props: {
      data,
    },
  };
};
