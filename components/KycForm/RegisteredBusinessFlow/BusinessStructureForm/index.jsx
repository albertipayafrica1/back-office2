import { Stack } from "@mui/material";

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
} from "./data";

import * as styles from "./styles";

const BusinessStructureForm = (data) => {
  const initialValues = {
    businessName: "",
    title: "",
    countryOfOperation: "Kenya",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={businessStructure}
      onSubmit={() => {}}
      enableReinitialize
    >
      {(formik) => {
        return (
          <Form>
            <Stack sx={styles.formContainer} component="form" spacing={8}>
              <CreateAccountFormDiv topLabel="Business Representative">
                <Stack direction="column" spacing={2}>
                  <Stack direction="row" spacing={3}>
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
                      label="Surname"
                      name="surname"
                      variant="outlined"
                      type="text"
                      id="surname"
                      required
                    />
                    <FormikControl
                      control="input"
                      label="First Name"
                      name="firstName"
                      variant="outlined"
                      type="text"
                      id="firstName"
                      required
                    />
                    <FormikControl
                      control="input"
                      label="Middle Name"
                      name="middleName"
                      variant="outlined"
                      type="text"
                      id="middleName"
                    />
                  </Stack>
                  <Stack direction="row" spacing={3}>
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="contactNumber"
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
                      name="email"
                      variant="outlined"
                      type="text"
                      id="email"
                      required
                    />
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={3}
                    justifyContent="space-between"
                  >
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="gender"
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
                      name="maritalStatus"
                      label="Marital Status"
                      type="text"
                      id="marital Status"
                      select
                      selectItem={maritalStatusOptions}
                      required
                    />
                  </Stack>
                  <Stack direction="row" spacing={3}>
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="countryOfOperation"
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
                  <Stack direction="row" spacing={3}>
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="businessName"
                      label="Business Name"
                      type="text"
                      id="businessName"
                      required
                    />
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="businessRegistrationNumber"
                      label="Business Registration Number"
                      type="text"
                      id="businessRegistrationNumber"
                      required
                    />
                  </Stack>
                  <Stack direction="row" spacing={3}>
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="businessCategory"
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
                      name="businessSubCategory"
                      label="Business SubCategory"
                      type="text"
                      id="businessSubCategory"
                      select
                      selectItem={businessSubCategoryOptions}
                      required
                    />
                  </Stack>
                  <Stack direction="row" spacing={3}>
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="businessTaxPin"
                      label="Business Tax Pin"
                      type="text"
                      id="businessTaxPin"
                      required
                    />
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="businessTelephone"
                      label="Business Telephone"
                      type="number"
                      id="businessTelephone"
                      required
                    />
                  </Stack>
                  <Stack direction="row" spacing={3}>
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="businessEmail"
                      label="Business Email"
                      type="text"
                      id="businessEmail"
                      required
                    />
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="businessCurrency"
                      label="Currency Business Operates"
                      type="text"
                      id="businessCurrency"
                      required
                      select
                      selectItem={businessCurrencyOptions}
                    />
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="businessDescription"
                      label="Business Description"
                      type="text"
                      id="businessDescription"
                      required
                      multiline
                    />
                  </Stack>
                </Stack>
              </CreateAccountFormDiv>
              <CreateAccountFormDiv topLabel="Business Location">
                <Stack direction="column" spacing={2}>
                  <Stack spacing={3} direction="row">
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="physicalAddress"
                      label="Physical Address (Street/Road/Building)"
                      type="text"
                      id="physicalAddress"
                      required
                    />
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="postalAddress"
                      label="Postal Address"
                      type="text"
                      id="postalAddress"
                      required
                    />
                  </Stack>
                  <Stack direction="row" spacing={3}>
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="postalCode"
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
                    direction="row"
                    spacing={3}
                    justifyContent="space-between"
                  >
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="county"
                      label="County"
                      type="text"
                      id="county"
                      required
                    />
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="websiteLink"
                      label="Business Website Link"
                      type="text"
                      id="websiteLink"
                    />
                  </Stack>
                  <Stack direction="row" spacing={3}>
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="appLink"
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
                    name="beneficialOwners"
                    label="Enter number Of Beneficial Owners"
                    type="number"
                    id="beneficialOwners"
                    required
                    multiline
                  />
                </Stack>
              </CreateAccountFormDiv>

              <CreateAccountFormDiv topLabel="Ultimate Beneficial Owner">
                <Stack direction="column" spacing={2}>
                  <Stack direction="row" spacing={3}>
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
                      label="Surname"
                      name="surname"
                      variant="outlined"
                      type="text"
                      id="surname"
                      required
                    />
                    <FormikControl
                      control="input"
                      label="First Name"
                      name="firstName"
                      variant="outlined"
                      type="text"
                      id="firstName"
                      required
                    />
                    <FormikControl
                      control="input"
                      label="Middle Name"
                      name="middleName"
                      variant="outlined"
                      type="text"
                      id="middleName"
                    />
                  </Stack>
                  <Stack direction="row" spacing={3}>
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="contactNumber"
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
                      name="email"
                      variant="outlined"
                      type="text"
                      id="email"
                      required
                    />
                  </Stack>
                  <Stack direction="row" spacing={3}>
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="documentType"
                      label="Document Type"
                      type="text"
                      id="documentType"
                      required
                      select
                      selectItem={documentTypeOptions}
                    />
                    <FormikControl
                      control="input"
                      label="Document Number"
                      name="documentNumber"
                      variant="outlined"
                      type="text"
                      id="documentNumber"
                      required
                    />
                  </Stack>
                  <Stack direction="row" spacing={3}>
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="nationality"
                      label="Nationality"
                      type="text"
                      id="nationality"
                      required
                    />
                    <FormikControl
                      control="input"
                      label="Enter Number Of Beneficiaries"
                      name="beneficiaries"
                      variant="outlined"
                      type="number"
                      id="beneficiaries"
                      required
                    />
                  </Stack>
                </Stack>
              </CreateAccountFormDiv>
              <CreateAccountFormDiv topLabel="Next Of Kin">
                <Stack direction="column" spacing={2}>
                  <Stack direction="row" spacing={3}>
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
                      label="Surname"
                      name="surname"
                      variant="outlined"
                      type="text"
                      id="surname"
                      required
                    />
                    <FormikControl
                      control="input"
                      label="First Name"
                      name="firstName"
                      variant="outlined"
                      type="text"
                      id="firstName"
                      required
                    />
                    <FormikControl
                      control="input"
                      label="Middle Name"
                      name="middleName"
                      variant="outlined"
                      type="text"
                      id="middleName"
                    />
                  </Stack>
                  <Stack direction="row" spacing={3}>
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="contactNumber"
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
                      name="email"
                      variant="outlined"
                      type="text"
                      id="email"
                      required
                    />
                  </Stack>
                  <Stack direction="row" spacing={3}>
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="relationship"
                      label="Relationship"
                      type="text"
                      id="relationship"
                      required
                    />
                    <FormikControl
                      control="input"
                      label="Percentage Beneficiary"
                      name="percentageBeneficiary"
                      variant="outlined"
                      type="number"
                      id="percentageBeneficiary"
                      required
                    />
                  </Stack>
                </Stack>
              </CreateAccountFormDiv>
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
