import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useDispatch } from "react-redux";

import PropTypes from "prop-types";

import axios from "axios";
import Cookies from "js-cookie";

import { Stack, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";
import FormikControl from "../../../FormikControls";

import CreateAccountFormDiv from "../../../../atoms/CreateAccountFormDiv";
import MuiAlert from "../../../../atoms/MuiAlert";
import Loader from "../../../../atoms/Loader";

import { businessStructure } from "../../../../utils/formValidations/kyc/registeredBusinessFlow/businessStructure";
import { telephoneCodes } from "../../../../utils/data";
import { getTelephoneCountryCode } from "../../../../utils/countryOfOperation";

import { titleOptions, genderOptions, documentTypeOptions } from "./data";

import { fetchKycStatusSuccess } from "../../../../redux";

import * as styles from "./styles";

const initialValues = {
  businessRepresentative: {
    title: "",
    surname: "",
    firstName: "",
    middleName: "",
    telephoneCountryCode: "KE",
    contactNumber: "",
    email: "",
    gender: "",
    dateOfBirth: null,
    countryOfOperation: "Kenya",
    documentType: "1",
    documentNumber: "",
    nationalIdFront: [],
    nationalIdBack: [],
    passport: [],
    passportSizePhoto: [],
    pinCertificate: [],
  },
  registeredBusinessDetails: {
    businessName: "",
    businessRegistrationNumber: "",
    businessCategory: "",
    businessSubCategory: "",
    telephoneCountryCode: "KE",
    businessTaxPin: "",
    businessTelephone: "",
    businessEmail: "",
    businessDescription: "",
  },
  businessLocation: {
    physicalAddress: "",
    postalAddress: "",
    postalCode: "",
    city: "",
    county: "",
    websiteLink: "",
    appDownloadLink: "",
  },
};

const BusinessStructureForm = ({ handleNextStep }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState(null);
  const [loading, setLoading] = useState(false);
  const [retrievalLoading, setRetrievalLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [businessCategoryValue, setBusinessCategoryValue] = useState();
  const [businessCategoryOptions, setBusinessCategoryOptions] = useState([]);
  const [businessSubCategoryOptions, setBusinessSubCategoryOptions] = useState(
    []
  );
  const [subCategoryLoading, setSubCategoryLoading] = useState(false);

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
          dispatch(fetchKycStatusSuccess(response.data.response.kycStatus));
          setLoading(false);
          handleNextStep();
        } else {
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
        } else {
          setAlert({ type: "error", message: "Something Went Wrong" });
        }
        formikHelpers.setSubmitting(false);
      });
  };

  useEffect(() => {
    setRetrievalLoading(true);
    const credentials = Cookies.get("iPayT");
    const businessCategoryConfig = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/utils/business-categories`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials}`,
      },
      withCredentials: true,
    };

    axios(businessCategoryConfig)
      .then((response) => {
        if (response.data.success === true) {
          setBusinessCategoryOptions(response.data.response);
        } else {
          setAlert({ type: "error", message: "Something Went Wrong" });
        }
      })
      .catch((error) => {
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
      });
  }, []);

  useEffect(() => {
    setRetrievalLoading(true);

    if (businessCategoryOptions.length === 0) {
      return;
    }
    const credentials = Cookies.get("iPayT");

    const config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/kyc/businessStructure`,
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
          setBusinessCategoryValue(
            response.data.response.registeredBusinessDetails.businessCategory
          );
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
  }, [businessCategoryOptions]);

  useEffect(() => {
    if (
      businessCategoryValue === undefined ||
      businessCategoryValue === "" ||
      businessCategoryValue === null
    ) {
      return;
    }
    setSubCategoryLoading(true);

    const credentials = Cookies.get("iPayT");

    const businessSubCategoryConfig = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/utils/business-subcategories/${businessCategoryValue}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials}`,
      },
      withCredentials: true,
    };

    axios(businessSubCategoryConfig)
      .then((response) => {
        if (response.data.success === true) {
          setBusinessSubCategoryOptions(response.data.response);
        } else {
          setAlert({ type: "error", message: "Something Went Wrong" });
        }
        setSubCategoryLoading(false);
      })
      .catch((error) => {
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
        setSubCategoryLoading(false);
      });
  }, [businessCategoryValue]);

  if (retrievalLoading) {
    return <Loader spaceAround="md" alignment={{ height: "65vh" }} />;
  }
  return (
    <>
      <Stack sx={{ padding: "2.5rem 0 0 0" }} spacing={1}>
        <Formik
          initialValues={formValues || initialValues}
          validationSchema={businessStructure}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form>
                <Stack spacing={8}>
                  <CreateAccountFormDiv topLabel="Business Representative">
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
                          <Box sx={{ width: "150px" }}>
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
                              disabled
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
                            disabled
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
                          disabled
                        />
                        <FormikControl
                          control="input"
                          label="Middle Name"
                          name="businessRepresentative.middleName"
                          variant="outlined"
                          type="text"
                          id="middleName"
                          disabled
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
                          <Box sx={{ width: "150px" }}>
                            {/* <FormikControl
                              control="input"
                              name="businessRepresentative.telephoneCountryCode"
                              label="Code"
                              type="text"
                              select
                              selectItem={telephoneCodes}
                              id="businessRepresentative.telephoneCountryCode"
                              required
                            /> */}
                            <FormikControl
                              control="autocomplete"
                              name="businessRepresentative.telephoneCountryCode"
                              label="Code"
                              use="telephoneCountryCode"
                              options={telephoneCodes}
                              required
                              defaultValue={getTelephoneCountryCode(
                                formValues?.businessRepresentative
                                  ?.telephoneCountryCode
                              )}
                              disabled
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
                            disabled
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
                          disabled
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
                      </Stack>
                      {formik.values.businessRepresentative.documentType ===
                        "1" && (
                        <Stack
                          direction={{ xs: "column", md: "row" }}
                          spacing={3}
                        >
                          <FormikControl
                            control="singleFileUpload"
                            label="National Id of the Business Representative (front)"
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
                            label="National Id of the Business Representative (Back)"
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

                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={3}
                      >
                        {formik.values.businessRepresentative.documentType ===
                          "2" && (
                          <FormikControl
                            control="singleFileUpload"
                            label="Passport of the Business Representative"
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
                        )}
                        <FormikControl
                          control="singleFileUpload"
                          label="Colored Passport Size Photo of the Representative"
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
                          label="Tax PIN certificate of the Business Representative"
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
                  <CreateAccountFormDiv topLabel="Registered Business Details">
                    <Stack direction="column" spacing={2}>
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={3}
                      >
                        <FormikControl
                          control="input"
                          variant="outlined"
                          name="registeredBusinessDetails.businessName"
                          label="Business Name"
                          type="text"
                          id="businessName"
                          required
                        />
                        <FormikControl
                          control="input"
                          variant="outlined"
                          name="registeredBusinessDetails.businessRegistrationNumber"
                          label="Business Registration Number"
                          type="text"
                          id="businessRegistrationNumber"
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
                          name="registeredBusinessDetails.businessCategory"
                          label="Business Category"
                          type="text"
                          id="businessCategory"
                          select
                          selectItem={businessCategoryOptions}
                          required
                          onChange={(e) => {
                            formik.setFieldValue(
                              "registeredBusinessDetails.businessCategory",
                              e.target.value
                            );
                            setBusinessCategoryValue(e.target.value);
                          }}
                        />
                        {subCategoryLoading ? (
                          <Loader spaceAround="xs" />
                        ) : (
                          <FormikControl
                            control="input"
                            variant="outlined"
                            name="registeredBusinessDetails.businessSubCategory"
                            label="Business SubCategory"
                            type="text"
                            id="businessSubCategory"
                            select
                            selectItem={businessSubCategoryOptions}
                            required
                            disabled={
                              formik.values.registeredBusinessDetails
                                .businessCategory === "" ||
                              formik.values.registeredBusinessDetails
                                .businessCategory === undefined
                            }
                          />
                        )}
                      </Stack>
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={3}
                      >
                        <FormikControl
                          control="input"
                          variant="outlined"
                          name="registeredBusinessDetails.businessTaxPin"
                          label="Business Tax Pin"
                          type="text"
                          id="businessTaxPin"
                          required
                        />
                        <Stack
                          sx={{
                            width: "100%",
                          }}
                          direction={{ xs: "row" }}
                          spacing={3}
                        >
                          <Box sx={{ width: "130px" }}>
                            {/* <FormikControl
                              control="input"
                              name="registeredBusinessDetails.telephoneCountryCode"
                              label="Code"
                              type="text"
                              select
                              selectItem={telephoneCodes}
                              id="registeredBusinessDetails.telephoneCountryCode"
                              required
                            /> */}
                            <FormikControl
                              control="autocomplete"
                              name="registeredBusinessDetails.telephoneCountryCode"
                              label="Code"
                              use="telephoneCountryCode"
                              options={telephoneCodes}
                              required
                              defaultValue={getTelephoneCountryCode(
                                formValues?.registeredBusinessDetails
                                  ?.telephoneCountryCode
                              )}
                            />
                          </Box>
                          <FormikControl
                            control="input"
                            variant="outlined"
                            name="registeredBusinessDetails.businessTelephone"
                            label="Business Telephone"
                            type="number"
                            id="registeredBusinessDetails.businessTelephone"
                            required
                          />
                        </Stack>
                      </Stack>
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={3}
                      >
                        <FormikControl
                          control="input"
                          variant="outlined"
                          name="registeredBusinessDetails.businessEmail"
                          label="Business Email"
                          type="text"
                          id="registeredBusinessDetails.businessEmail"
                          required
                        />
                      </Stack>
                      <FormikControl
                        control="input"
                        variant="outlined"
                        name="registeredBusinessDetails.businessDescription"
                        label="Business Description (min 50 characters)"
                        type="text"
                        id="registeredBusinessDetails.businessDescription"
                        required
                        multiline
                      />
                    </Stack>
                  </CreateAccountFormDiv>
                  <CreateAccountFormDiv topLabel="Business Location">
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
                          id="businessLocation.physicalAddress"
                          required
                        />
                        <FormikControl
                          control="input"
                          variant="outlined"
                          name="businessLocation.postalAddress"
                          label="Postal Address"
                          type="text"
                          id="businessLocation.postalAddress"
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
                          id="businessLocation.postalCode"
                          required
                        />
                        <FormikControl
                          control="input"
                          variant="outlined"
                          name="businessLocation.city"
                          label="City/Town"
                          type="text"
                          id="businessLocation.city"
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
                          id="businessLocation.county"
                        />
                        <FormikControl
                          control="input"
                          variant="outlined"
                          name="businessLocation.websiteLink"
                          label="Business Website Link"
                          type="text"
                          id="businessLocation.websiteLink"
                          d
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
                          id="businessLocation.appDownloadLink"
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
        {alert.type !== "" && alert.message !== "" && (
          <MuiAlert variant={alert.type} message={alert.message} />
        )}
      </Stack>
    </>
  );
};

BusinessStructureForm.propTypes = {
  handleNextStep: PropTypes.func.isRequired,
};

export default BusinessStructureForm;
