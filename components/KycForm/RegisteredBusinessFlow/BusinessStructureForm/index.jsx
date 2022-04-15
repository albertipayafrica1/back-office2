import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import PropTypes from "prop-types";

import axios from "axios";
import Cookies from "js-cookie";

import { Stack, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";
import FormikControl from "../../../FormikControls";

import CreateAccountFormDiv from "../../../../atoms/CreateAccountFormDiv";
import MuiAlert from "../../../../atoms/MuiAlert";

import { businessStructure } from "../../../../utils/formValidations/kyc/registeredBusinessFlow/businessStructure";

import {
  titleOptions,
  genderOptions,
  maritalStatusOptions,
  businessCategoryOptions,
  businessSubCategoryOptions,
  businessCurrencyOptions,
  documentTypeOptions,
  shareHolderTypeOptions,
  telephoneCodes,
  documentTypeOptionsForNextOfKin,
} from "./data";

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
    maritalStatus: "",
    dateOfBirth: null,
    countryOfOperation: "KE",
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
    businessTaxPin: "",
    BusinessTelephone: "",
    businessEmail: "",
    businessCurrency: "",
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
  numberOfBeneficialOwners: "1",
  ultimateBeneficialOwners: [
    {
      title: "",
      surname: "",
      firstName: "",
      middleName: "",
      shareHolderType: "",
      otherShareHolderType: "",
      telephoneCountryCode: "",
      contactNumber: "",
      email: "",
      documentType: "1",
      documentNumber: "",
      nationalIdFront: [],
      nationalIdBack: [],
      passport: [],
      passportSizePhoto: [],
      pinCertificate: [],
      nationality: "",
      numberOfBeneficiaries: "1",
      nextOfKin: [
        {
          title: "",
          surname: "",
          firstName: "",
          middleName: "",
          telephoneCountryCode: "",
          contactNumber: "",
          email: "",
          relationship: "",
          dateOfBirth: null,
          documentType: "1",
          documentNumber: "",
          nationalIdFront: [],
          nationalIdBack: [],
          passport: [],
          birthCertificate: [],
          percentageBeneficiary: "100",
        },
      ],
    },
  ],
};

const BusinessStructureForm = ({ handleNextStep }) => {
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
      // this you get it from api call
      businessRepresentative: {
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
        countryOfOperation: "KE",
        documentType: "1",
        documentNumber: "",
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
      registeredBusinessDetails: {
        businessName: "",
        businessRegistrationNumber: "",
        businessCategory: "",
        businessSubCategory: "",
        businessTaxPin: "",
        BusinessTelephone: "",
        businessEmail: "",
        businessCurrency: "",
        businessDescription: "",
      },
      businessLocation: {
        physicalAddress: "This is my physical address",
        postalAddress: "",
        postalCode: "",
        city: "",
        county: "",
        websiteLink: "",
        appDownloadLink: "",
      },
      numberOfBeneficialOwners: "1",
      ultimateBeneficialOwners: [
        {
          title: "",
          surname: "",
          firstName: "",
          middleName: "",
          shareHolderType: "",
          otherShareHolderType: "",
          telephoneCountryCode: "",
          contactNumber: "",
          email: "",
          documentType: "1",
          documentNumber: "",
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
          passportSizePhoto: [
            {
              file: { path: "elipa-Single-logos-black.png" },
              errors: [],
              id: 1,
              url: "https://res.cloudinary.com/demo/image/upload/v1648551450/docs_uploading_example/elipa-Single-logos-black_fqcxd1.png",
            },
          ],
          pinCertificate: [],
          nationality: "",
          numberOfBeneficiaries: "1",
          nextOfKin: [
            {
              title: "",
              surname: "",
              firstName: "",
              middleName: "",
              telephoneCountryCode: "",
              contactNumber: "",
              email: "",
              relationship: "",
              dateOfBirth: null,
              documentType: "1",
              documentNumber: "",
              nationalIdFront: [],
              nationalIdBack: [],
              passport: [],
              birthCertificate: [],
              percentageBeneficiary: "100",
            },
          ],
        },
      ],
    };
    setFormValues(savedValues);
  }, []);

  return (
    <>
      <Formik
        initialValues={formValues || initialValues}
        validationSchema={businessStructure}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => {
          // console.log(formik.values, "fork");
          return (
            <Form>
              <Stack sx={styles.formContainer} spacing={8}>
                <CreateAccountFormDiv topLabel="Business Representative">
                  <Stack direction="column" spacing={2}>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                      <Stack
                        sx={{
                          width: "100%",
                        }}
                        direction={{ xs: "row" }}
                        spacing={3}
                      >
                        <Box sx={{ width: "360px" }}>
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
                    </Stack>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                      <Stack
                        sx={{
                          width: "100%",
                        }}
                        direction={{ xs: "row" }}
                        spacing={3}
                      >
                        <Box sx={{ width: "130px" }}>
                          <FormikControl
                            control="input"
                            name="businessRepresentative.telephoneCountryCode"
                            label="Code"
                            type="text"
                            select
                            selectItem={telephoneCodes}
                            id="businessRepresentative.telephoneCountryCode"
                            required
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
                      justifyContent="space-between"
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
                        control="input"
                        variant="outlined"
                        name="businessRepresentative.maritalStatus"
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
                    <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
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
                      <Stack direction={{ xs: "column" }} spacing={3}>
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
                    {formik.values.businessRepresentative.documentType ===
                      "2" && (
                      <Stack direction={{ xs: "column" }} spacing={3}>
                        <FormikControl
                          control="singleFileUpload"
                          label="Passport of the Business Representative"
                          name="businessRepresentative.passport"
                          multiple={false}
                          required
                          givenFile={
                            formik.values.businessRepresentative.passport !==
                            undefined
                              ? formik.values.businessRepresentative.passport[0]
                              : null
                          }
                        />
                      </Stack>
                    )}
                    <Stack direction={{ xs: "column" }} spacing={3}>
                      <FormikControl
                        control="singleFileUpload"
                        label="Colored Passport Size Photograph of the Business Representative"
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
                    <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
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
                    <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
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
                      />
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
                      />
                    </Stack>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
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
                          <FormikControl
                            control="input"
                            name="registeredBusinessDetails.telephoneCountryCode"
                            label="Code"
                            type="text"
                            select
                            selectItem={telephoneCodes}
                            id="registeredBusinessDetails.telephoneCountryCode"
                            required
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
                    <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                      <FormikControl
                        control="input"
                        variant="outlined"
                        name="registeredBusinessDetails.businessEmail"
                        label="Business Email"
                        type="text"
                        id="registeredBusinessDetails.businessEmail"
                        required
                      />
                      <FormikControl
                        control="input"
                        variant="outlined"
                        name="registeredBusinessDetails.businessCurrency"
                        label="Currency Business Operates"
                        type="text"
                        id="registeredBusinessDetails.businessCurrency"
                        required
                        select
                        selectItem={businessCurrencyOptions}
                      />
                    </Stack>
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="registeredBusinessDetails.businessDescription"
                      label="Business Description (min 150 characters)"
                      type="text"
                      id="registeredBusinessDetails.businessDescription"
                      required
                      multiline
                    />
                  </Stack>
                </CreateAccountFormDiv>
                <CreateAccountFormDiv topLabel="Business Location">
                  <Stack direction="column" spacing={2}>
                    <Stack spacing={3} direction={{ xs: "column", md: "row" }}>
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
                    <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                      <FormikControl
                        control="input"
                        variant="outlined"
                        name="businessLocation.postalCode"
                        label="Postal Code"
                        type="number"
                        id="businessLocation.postalCode"
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
                        required
                      />
                    </Stack>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
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
                <CreateAccountFormDiv topLabel="Number Of Beneficial Owners">
                  <Stack>
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="numberOfBeneficialOwners"
                      label="Enter Number Of Beneficial Owners"
                      type="number"
                      id="numberOfBeneficialOwners"
                      required
                      onChange={(e) => {
                        formik.setFieldValue(
                          "numberOfBeneficialOwners",
                          e.target.value
                        );
                        const difference =
                          Number(e.target.value) -
                          formik.values.ultimateBeneficialOwners.length;

                        if (
                          Number(e.target.value) > 5 ||
                          Number(e.target.value) < 1
                        ) {
                          return null;
                        }
                        if (
                          difference >= 1 &&
                          difference <= 5 &&
                          Number(e.target.value) <= 5 &&
                          Number(e.target.value) >= 1
                        ) {
                          for (let i = 0; i < difference; i += 1) {
                            formik.values.ultimateBeneficialOwners.push({
                              title: "",
                              surname: "",
                              firstName: "",
                              middleName: "",
                              shareHolderType: "",
                              otherShareHolderType: "",
                              telephoneCountryCode: "",
                              contactNumber: "",
                              email: "",
                              documentType: "1",
                              documentNumber: "",
                              nationalIdFront: [],
                              nationalIdBack: [],
                              passport: [],
                              passportSizePhoto: [],
                              pinCertificate: [],
                              nationality: "",
                              numberOfBeneficiaries: "1",
                              nextOfKin: [
                                {
                                  title: "",
                                  surname: "",
                                  firstName: "",
                                  middleName: "",
                                  telephoneCountryCode: "",
                                  contactNumber: "",
                                  email: "",
                                  relationship: "",
                                  dateOfBirth: null,
                                  documentType: "1",
                                  documentNumber: "",
                                  nationalIdFront: [],
                                  nationalIdBack: [],
                                  passport: [],
                                  birthCertificate: [],
                                  percentageBeneficiary: "100",
                                },
                              ],
                            });
                          }
                        } else if (
                          difference >= -5 &&
                          difference < 0 &&
                          Number(e.target.value) <= 5 &&
                          Number(e.target.value) >= 1
                        ) {
                          for (let i = 0; i < Math.abs(difference); i += 1) {
                            formik.values.ultimateBeneficialOwners.pop();
                          }
                        }
                        return null;
                      }}
                    />
                  </Stack>
                </CreateAccountFormDiv>

                {formik.values.ultimateBeneficialOwners.map((item, index) => (
                  <>
                    <CreateAccountFormDiv
                      topLabel={`Ultimate Beneficial Owner ${index + 1}`}
                    >
                      <Stack direction="column" spacing={2}>
                        <Stack
                          direction={{ xs: "column", md: "row" }}
                          spacing={3}
                        >
                          <FormikControl
                            control="select"
                            variant="outlined"
                            name={`ultimateBeneficialOwners[${index}].title`}
                            label="Title"
                            type="text"
                            select
                            selectItem={titleOptions}
                            id={`ultimateBeneficialOwners[${index}].title`}
                            required
                          />
                          <FormikControl
                            control="input"
                            label="Surname"
                            name={`ultimateBeneficialOwners[${index}].surname`}
                            variant="outlined"
                            type="text"
                            id={`ultimateBeneficialOwners[${index}].surname`}
                            required
                          />
                          <FormikControl
                            control="input"
                            label="First Name"
                            name={`ultimateBeneficialOwners[${index}].firstName`}
                            variant="outlined"
                            type="text"
                            id={`ultimateBeneficialOwners[${index}].firstName`}
                            required
                          />
                          <FormikControl
                            control="input"
                            label="Middle Name"
                            name={`ultimateBeneficialOwners[${index}].middleName`}
                            variant="outlined"
                            type="text"
                            id={`ultimateBeneficialOwners[${index}].middleName`}
                          />
                        </Stack>
                        <Stack
                          direction={{ xs: "column", md: "row" }}
                          spacing={3}
                        >
                          <FormikControl
                            control="radio"
                            label="ShareHolder Type"
                            name={`ultimateBeneficialOwners[${index}].shareHolderType`}
                            options={shareHolderTypeOptions}
                          />
                        </Stack>

                        {formik.values.ultimateBeneficialOwners[index]
                          .shareHolderType === "4" && (
                          <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={3}
                          >
                            <FormikControl
                              control="input"
                              label="Other ShareHolder Type"
                              name={`ultimateBeneficialOwners[${index}].otherShareHolderType`}
                              variant="outlined"
                              type="text"
                              id={`ultimateBeneficialOwners[${index}].otherShareHolderType`}
                              required
                            />
                          </Stack>
                        )}

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
                            <Box sx={{ width: "130px" }}>
                              <FormikControl
                                control="input"
                                name={`ultimateBeneficialOwners[${index}].telephoneCountryCode`}
                                label="Code"
                                type="text"
                                select
                                selectItem={telephoneCodes}
                                id={`ultimateBeneficialOwners[${index}].telephoneCountryCode`}
                                required
                              />
                            </Box>
                            <FormikControl
                              control="input"
                              variant="outlined"
                              name={`ultimateBeneficialOwners[${index}].contactNumber`}
                              label="Contact Number"
                              type="number"
                              id={`ultimateBeneficialOwners[${index}].contactNumber`}
                              required
                              haveTooltip
                              tooltipText="Enter Your Contact number without country code"
                            />
                          </Stack>
                          <FormikControl
                            control="input"
                            label="Email"
                            name={`ultimateBeneficialOwners[${index}].email`}
                            variant="outlined"
                            type="text"
                            id={`ultimateBeneficialOwners[${index}].email`}
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
                            name={`ultimateBeneficialOwners[${index}].documentType`}
                            label="Document Type"
                            type="text"
                            id={`ultimateBeneficialOwners[${index}].documentType`}
                            required
                            select
                            selectItem={documentTypeOptions}
                            onChange={(e) => {
                              formik.setFieldValue(
                                `ultimateBeneficialOwners[${index}].documentType`,
                                e.target.value
                              );
                              formik.setFieldValue(
                                `ultimateBeneficialOwners[${index}].documentNumber`,
                                ""
                              );
                              formik.setFieldValue(
                                `ultimateBeneficialOwners[${index}].passport`,
                                []
                              );
                              formik.setFieldValue(
                                `ultimateBeneficialOwners[${index}].nationalIdFront`,
                                []
                              );
                              formik.setFieldValue(
                                `ultimateBeneficialOwners[${index}].nationalIdBack`,
                                []
                              );
                              formik.setFieldValue(
                                `ultimateBeneficialOwners[${index}].birthCertificate`,
                                []
                              );
                            }}
                          />
                          <FormikControl
                            control="input"
                            label="Document Number"
                            name={`ultimateBeneficialOwners[${index}].documentNumber`}
                            variant="outlined"
                            type="text"
                            id={`ultimateBeneficialOwners[${index}].documentNumber`}
                            required
                          />
                        </Stack>
                        {formik.values.ultimateBeneficialOwners[index]
                          .documentType === "1" && (
                          <Stack direction={{ xs: "column" }} spacing={3}>
                            <FormikControl
                              control="singleFileUpload"
                              label="National Id of Business Owner (front)"
                              name={`ultimateBeneficialOwners[${index}].nationalIdFront`}
                              multiple={false}
                              required
                              givenFile={
                                formik.values.ultimateBeneficialOwners[index]
                                  .nationalIdFront !== undefined
                                  ? formik.values.ultimateBeneficialOwners[
                                      index
                                    ].nationalIdFront[0]
                                  : null
                              }
                            />

                            <FormikControl
                              control="singleFileUpload"
                              label="National Id of Business Owner (Back)"
                              name={`ultimateBeneficialOwners[${index}].nationalIdBack`}
                              multiple={false}
                              required
                              givenFile={
                                formik.values.ultimateBeneficialOwners[index]
                                  .nationalIdBack !== undefined
                                  ? formik.values.ultimateBeneficialOwners[
                                      index
                                    ].nationalIdBack[0]
                                  : null
                              }
                            />
                          </Stack>
                        )}
                        {formik.values.ultimateBeneficialOwners[index]
                          .documentType === "2" && (
                          <Stack direction={{ xs: "column" }} spacing={3}>
                            <FormikControl
                              control="singleFileUpload"
                              label="Passport of Business Owner (front)"
                              name={`ultimateBeneficialOwners[${index}].passport]`}
                              multiple={false}
                              required
                              givenFile={
                                formik.values.ultimateBeneficialOwners[index]
                                  .passport !== undefined
                                  ? formik.values.ultimateBeneficialOwners[
                                      index
                                    ].passport[0]
                                  : null
                              }
                            />
                          </Stack>
                        )}
                        <Stack direction={{ xs: "column" }} spacing={3}>
                          <FormikControl
                            control="singleFileUpload"
                            label="Colored Passport Size Photograph of Business Owner"
                            name={`ultimateBeneficialOwners[${index}].passportSizePhoto`}
                            multiple={false}
                            required
                            givenFile={
                              formik.values.ultimateBeneficialOwners[index]
                                .passportSizePhoto !== undefined
                                ? formik.values.ultimateBeneficialOwners[index]
                                    .passportSizePhoto[0]
                                : null
                            }
                          />
                          <FormikControl
                            control="singleFileUpload"
                            label="Tax PIN certificate of Business Owner (individual)"
                            name={`ultimateBeneficialOwners[${index}].pinCertificate`}
                            multiple={false}
                            required
                            givenFile={
                              formik.values.ultimateBeneficialOwners[index]
                                .pinCertificate !== undefined
                                ? formik.values.ultimateBeneficialOwners[index]
                                    .pinCertificate[0]
                                : null
                            }
                          />
                        </Stack>
                        <Stack
                          direction={{ xs: "column", md: "row" }}
                          spacing={3}
                        >
                          <FormikControl
                            control="input"
                            variant="outlined"
                            name={`ultimateBeneficialOwners[${index}].nationality`}
                            label="Nationality"
                            type="text"
                            id={`ultimateBeneficialOwners[${index}].nationality`}
                            required
                          />
                          <FormikControl
                            control="input"
                            label="Enter Number Of Beneficiaries"
                            name={`ultimateBeneficialOwners[${index}].numberOfBeneficiaries`}
                            variant="outlined"
                            type="number"
                            id={`ultimateBeneficialOwners[${index}].numberOfBeneficiaries`}
                            required
                            disabled
                          />
                        </Stack>
                      </Stack>
                    </CreateAccountFormDiv>

                    {item.nextOfKin.map((item1, index1) => (
                      <CreateAccountFormDiv
                        topLabel={`Next Of Kin ${index1 + 1}`}
                      >
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
                                  name={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].title`}
                                  label="Title"
                                  type="text"
                                  select
                                  selectItem={titleOptions}
                                  id={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].title`}
                                  required
                                />
                              </Box>
                              <FormikControl
                                control="input"
                                label="Surname"
                                name={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].surname`}
                                variant="outlined"
                                type="text"
                                id={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].surname`}
                                required
                              />
                            </Stack>
                            <FormikControl
                              control="input"
                              label="First Name"
                              name={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].firstName`}
                              variant="outlined"
                              type="text"
                              id={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].firstName`}
                              required
                            />
                            <FormikControl
                              control="input"
                              label="Middle Name"
                              name={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].middleName`}
                              variant="outlined"
                              type="text"
                              id={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].middleName`}
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
                              <Box sx={{ width: "130px" }}>
                                <FormikControl
                                  control="input"
                                  name={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].telephoneCountryCode`}
                                  label="Code"
                                  type="text"
                                  select
                                  selectItem={telephoneCodes}
                                  id={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].telephoneCountryCode`}
                                  required
                                />
                              </Box>
                              <FormikControl
                                control="input"
                                variant="outlined"
                                name={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].contactNumber`}
                                label="Contact Number"
                                type="number"
                                id={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].contactNumber`}
                                required
                                haveTooltip
                                tooltipText="Enter Your Contact number without country code"
                              />
                            </Stack>
                            <FormikControl
                              control="input"
                              label="Email"
                              name={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].email`}
                              variant="outlined"
                              type="text"
                              id={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].email`}
                            />
                          </Stack>
                          <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={3}
                          >
                            <FormikControl
                              control="input"
                              variant="outlined"
                              name={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].relationship`}
                              label="Relationship"
                              type="text"
                              id={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].relationship`}
                              required
                            />
                            <FormikControl
                              control="datePicker"
                              label="Date Of Birth"
                              name={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].dateOfBirth`}
                              required
                              onChange={(val) => {
                                formik.setFieldValue(
                                  `ultimateBeneficialOwners[${index}].nextOfKin[${index1}].dateOfBirth`,
                                  val
                                );
                              }}
                            />
                            <FormikControl
                              control="input"
                              variant="outlined"
                              name={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].documentType`}
                              label="Document Type"
                              type="text"
                              id={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].documentType`}
                              required
                              select
                              selectItem={documentTypeOptionsForNextOfKin}
                              onChange={(e) => {
                                formik.setFieldValue(
                                  `ultimateBeneficialOwners[${index}].nextOfKin[${index1}].documentType`,
                                  e.target.value
                                );
                                formik.setFieldValue(
                                  `ultimateBeneficialOwners[${index}].nextOfKin[${index1}].documentNumber`,
                                  ""
                                );
                                formik.setFieldValue(
                                  `ultimateBeneficialOwners[${index}].nextOfKin[${index1}].passport`,
                                  []
                                );
                                formik.setFieldValue(
                                  `ultimateBeneficialOwners[${index}].nextOfKin[${index1}].nationalIdFront`,
                                  []
                                );
                                formik.setFieldValue(
                                  `ultimateBeneficialOwners[${index}].nextOfKin[${index1}].nationalIdBack`,
                                  []
                                );
                                formik.setFieldValue(
                                  `ultimateBeneficialOwners[${index}].nextOfKin[${index1}].birthCertificate`,
                                  []
                                );
                              }}
                            />
                            <FormikControl
                              control="input"
                              variant="outlined"
                              name={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].documentNumber`}
                              label="Document Number"
                              type="text"
                              id={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].documentNumber`}
                              required
                            />
                          </Stack>
                          <Stack spacing={3}>
                            {formik.values.ultimateBeneficialOwners[index]
                              .nextOfKin[index1].documentType === "1" && (
                              <Stack direction={{ xs: "column" }} spacing={3}>
                                <FormikControl
                                  control="singleFileUpload"
                                  label="National Id of Next Of Kin (front)"
                                  name={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].nationalIdFront`}
                                  multiple={false}
                                  required
                                  givenFile={
                                    formik.values.ultimateBeneficialOwners[
                                      index
                                    ].nextOfKin[index1].nationalIdFront !==
                                    undefined
                                      ? formik.values.ultimateBeneficialOwners[
                                          index
                                        ].nextOfKin[index1].nationalIdFront[0]
                                      : null
                                  }
                                />
                                <FormikControl
                                  control="singleFileUpload"
                                  label="National Id of Next Of Kin (Back)"
                                  name={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].nationalIdBack`}
                                  multiple={false}
                                  required
                                  givenFile={
                                    formik.values.ultimateBeneficialOwners[
                                      index
                                    ].nextOfKin[index1].nationalIdBack !==
                                    undefined
                                      ? formik.values.ultimateBeneficialOwners[
                                          index
                                        ].nextOfKin[index1].nationalIdBack[0]
                                      : null
                                  }
                                />
                              </Stack>
                            )}
                            {formik.values.ultimateBeneficialOwners[index]
                              .nextOfKin[index1].documentType === "2" && (
                              <FormikControl
                                control="singleFileUpload"
                                label="Passport of  Next Of Kin"
                                name={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].passport`}
                                multiple={false}
                                required
                                givenFile={
                                  formik.values.ultimateBeneficialOwners[index]
                                    .nextOfKin[index1].passport !== undefined
                                    ? formik.values.ultimateBeneficialOwners[
                                        index
                                      ].nextOfKin[index1].passport[0]
                                    : null
                                }
                              />
                            )}
                            {formik.values.ultimateBeneficialOwners[index]
                              .nextOfKin[index1].documentType === "3" && (
                              <FormikControl
                                control="singleFileUpload"
                                label="Birth Certificate of Next Of Kin "
                                name={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].birthCertificate`}
                                multiple={false}
                                required
                                givenFile={
                                  formik.values.ultimateBeneficialOwners[index]
                                    .nextOfKin[index1].birthCertificate !==
                                  undefined
                                    ? formik.values.ultimateBeneficialOwners[
                                        index
                                      ].nextOfKin[index1].birthCertificate[0]
                                    : null
                                }
                              />
                            )}
                          </Stack>
                          <Stack spacing={3}>
                            <FormikControl
                              control="input"
                              label="Percentage Beneficiary"
                              name={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].percentageBeneficiary`}
                              variant="outlined"
                              type="number"
                              id={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].percentageBeneficiary`}
                              required
                              disabled
                            />
                          </Stack>
                        </Stack>
                      </CreateAccountFormDiv>
                    ))}
                  </>
                ))}
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
    </>
  );
};

BusinessStructureForm.propTypes = {
  handleNextStep: PropTypes.func.isRequired,
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
