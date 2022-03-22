import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";
import FormikControl from "../../../FormikControls";
import CreateAccountFormDiv from "../../../../atoms/CreateAccountFormDiv";
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
} from "./data";

import * as styles from "./styles";

const BusinessStructureForm = (data) => {
  const handleSubmit = (values, formikHelpers) => {
    console.log(values, "formValues");
    console.log(formikHelpers, "formikhlpers");
  };

  const loading = false;
  const initialValues = {
    businessRepresentative: {
      title: "",
      surname: "",
      firstName: "",
      middleName: "",
      contactNumber: "",
      email: "",
      gender: "",
      maritalStatus: "",
      dateOfBirth: null,
      countryOfOperation: "Kenya",
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
      postalcode: "",
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
        contactNumber: "",
        email: "",
        documentType: "",
        documentNumber: "",
        nationality: "",
        numberOfBeneficiaries: "1",
        nextOfKin: [
          {
            title: "",
            surname: "",
            firstName: "",
            middleName: "",
            contactNumber: "",
            email: "",
            relationship: "",
            percentageBeneficiary: "100",
          },
        ],
      },
    ],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={businessStructure}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {(formik) => {
        return (
          <Form>
            <Stack sx={styles.formContainer} spacing={8}>
              <CreateAccountFormDiv topLabel="Business Representative">
                <Stack direction="column" spacing={2}>
                  <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
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
                  <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="businessRepresentative.contactNumber"
                      label="Contact Number"
                      type="number"
                      id="contactNumber"
                      required
                      haveTooltip
                      tooltipText="Enter Your Contact number in the format 254xxxxxxxxx"
                    />
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
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="registeredBusinessDetails.businessTelephone"
                      label="Business Telephone"
                      type="number"
                      id="businessTelephone"
                      required
                    />
                  </Stack>
                  <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="registeredBusinessDetails.businessEmail"
                      label="Business Email"
                      type="text"
                      id="businessEmail"
                      required
                    />
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="registeredBusinessDetails.businessCurrency"
                      label="Currency Business Operates"
                      type="text"
                      id="businessCurrency"
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
                    id="businessDescription"
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
                  <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
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
                      name="city"
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
                      required
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
                  <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
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
                            contactNumber: "",
                            email: "",
                            documentType: "",
                            documentNumber: "",
                            nationality: "",
                            numberOfBeneficiaries: "1",
                            nextOfKin: [
                              {
                                title: "",
                                surname: "",
                                firstName: "",
                                middleName: "",
                                contactNumber: "",
                                email: "",
                                relationship: "",
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
                        <FormikControl
                          control="input"
                          variant="outlined"
                          name={`ultimateBeneficialOwners[${index}].contactNumber`}
                          label="Contact Number"
                          type="number"
                          id={`ultimateBeneficialOwners[${index}].contactNumber`}
                          required
                          haveTooltip
                          tooltipText="Enter Your Contact number in the format 254xxxxxxxxx"
                        />
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
                          <FormikControl
                            control="input"
                            label="Surname"
                            name={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].surname`}
                            variant="outlined"
                            type="text"
                            id={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].surname`}
                            required
                          />
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
                          <FormikControl
                            control="input"
                            variant="outlined"
                            name={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].contactNumber`}
                            label="Contact Number"
                            type="number"
                            id={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].contactNumber`}
                            required
                            haveTooltip
                            tooltipText="Enter Your Contact number in the format 254xxxxxxxxx"
                          />
                          <FormikControl
                            control="input"
                            label="Email"
                            name={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].email`}
                            variant="outlined"
                            type="text"
                            id={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].email`}
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
                            name={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].relationship`}
                            label="Relationship"
                            type="text"
                            id={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].relationship`}
                            required
                          />
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
