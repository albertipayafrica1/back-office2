import { useState } from "react";
import { Stack } from "@mui/material";

import useForm from "../../../../hooks/useForm";

import CreateAccountFormDiv from "../../../../atoms/CreateAccountFormDiv";
import CustomInput from "../../../../atoms/CustomInput";

import * as styles from "./styles";

const BusinessStructureForm = (data) => {
  const [formData, handleFormChange] = useForm({
    numberOfDirectors: 1,
    directorArray: [
      { id: 1, nextOfKinArray: [1] },
      { id: 2, nextOfKinArray: [2] },
    ],
  });

  const [errors, setErrors] = useState({});

  return (
    <Stack sx={styles.formContainer} component="form" spacing={8}>
      <CreateAccountFormDiv topLabel="Business Name">
        <Stack direction="column" spacing={2}>
          <Stack spacing={3}>
            <CustomInput
              variant="outlined"
              name="businessName"
              label="Business Name"
              type="text"
              id="businessName"
              value={formData.businessName}
              onChange={handleFormChange}
              error={!!errors.businessName}
              helperText={errors.businessName}
              required
            />
            <CustomInput
              variant="outlined"
              name="industry"
              label="Industry"
              type="text"
              id="industry"
              select
              selectItem={[{ id: 1, value: 200 }]}
              value={formData.industry}
              onChange={handleFormChange}
              error={!!errors.industry}
              helperText={errors.industry}
              required
            />
            <CustomInput
              variant="outlined"
              name="description"
              label="Description (minimum 150 characters)"
              type="text"
              id="description"
              value={formData.description}
              onChange={handleFormChange}
              error={!!errors.description}
              helperText={errors.description}
              required
              multiline
            />
          </Stack>
        </Stack>
      </CreateAccountFormDiv>
      <CreateAccountFormDiv topLabel="Business Details">
        <Stack direction="column" spacing={2}>
          <Stack spacing={3}>
            <CustomInput
              variant="outlined"
              name="physicalAddress"
              label="Physical Address (Street/Road/Building)"
              type="text"
              id="physicalAddress"
              value={formData.physicalAddress}
              onChange={handleFormChange}
              error={!!errors.physicalAddress}
              helperText={errors.physicalAddress}
              required
            />
            <CustomInput
              variant="outlined"
              name="postalAddress"
              label="Postal Address"
              type="text"
              id="postalAddress"
              value={formData.postalAddress}
              onChange={handleFormChange}
              error={!!errors.postalAddress}
              helperText={errors.postalAddress}
              required
            />
            <CustomInput
              variant="outlined"
              name="postalCode"
              label="Postal Code"
              type="number"
              id="postalCode"
              value={formData.postalCode}
              onChange={handleFormChange}
              error={!!errors.postalCode}
              helperText={errors.postalCode}
              required
            />
            <CustomInput
              variant="outlined"
              name="city"
              label="City/Town"
              type="text"
              id="city"
              value={formData.city}
              onChange={handleFormChange}
              error={!!errors.city}
              helperText={errors.city}
              required
            />
            <CustomInput
              variant="outlined"
              name="telephone"
              label="Telephone "
              type="number"
              id="telephone"
              value={formData.telephone}
              onChange={handleFormChange}
              error={!!errors.telephone}
              helperText={errors.telephone}
              required
            />
            <CustomInput
              variant="outlined"
              name="website"
              label="Website Link / App Download Link"
              type="text"
              id="website"
              value={formData.website}
              onChange={handleFormChange}
              error={!!errors.website}
              helperText={errors.website}
              required
            />
          </Stack>
        </Stack>
      </CreateAccountFormDiv>
      <CreateAccountFormDiv topLabel="Number Of Directors">
        <Stack direction="column" spacing={2}>
          <Stack spacing={3}>
            <CustomInput
              variant="outlined"
              name="numberOfDirectors"
              label="Enter Number Of Directors"
              type="number"
              id="numberOfDirectors"
              value={formData.numberOfDirectors}
              onChange={handleFormChange}
              error={!!errors.numberOfDirectors}
              helperText={errors.numberOfDirectors}
              required
              defaultValue={1}
            />
          </Stack>
        </Stack>
      </CreateAccountFormDiv>
      {formData.directorArray.map((item, index) => (
        <CreateAccountFormDiv topLabel={`Director ${index + 1}`}>
          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={1} justifyContent="space-between">
              <CustomInput
                variant="outlined"
                name="surname"
                label="Surname"
                type="text"
                id="surname"
                value={formData.surname}
                onChange={handleFormChange}
                error={!!errors.surname}
                helperText={errors.surname}
                required
              />
              <CustomInput
                variant="outlined"
                name="firstName"
                label="First Name"
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleFormChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                required
              />
              <CustomInput
                variant="outlined"
                name="middleName"
                label="Middle Name"
                type="text"
                id="middleName"
                value={formData.middleName}
                onChange={handleFormChange}
                error={!!errors.middleName}
                helperText={errors.middleName}
              />
            </Stack>
            <CustomInput
              variant="outlined"
              name="contactNumber"
              label="Contact Number"
              type="number"
              id="contactNumber"
              value={formData.contactNumber}
              onChange={handleFormChange}
              error={!!errors.contactNumber}
              helperText={errors.contactNumber}
              required
            />
            <CustomInput
              variant="outlined"
              name="email"
              label="Email"
              type="text"
              id="email"
              value={formData.email}
              onChange={handleFormChange}
              error={!!errors.email}
              helperText={errors.email}
              required
              haveTooltip
              tooltipText="Enter Your Email"
            />
            <CustomInput
              variant="outlined"
              name="Type"
              label="Document Type"
              type="text"
              select
              selectItem={[{ id: "1", value: "passport" }]}
              id="documentType"
              value={formData.countryOfOperation}
              onChange={handleFormChange}
              error={!!errors.countryOfOperation}
              helperText={errors.countryOfOperation}
              required
            />

            <CustomInput
              variant="outlined"
              name="documentNumber"
              label="Document Number"
              type="text"
              id="documentNumber"
              value={formData.documentNumber}
              onChange={handleFormChange}
              error={!!errors.documentNumber}
              helperText={errors.documentNumber}
              required
            />
            <CustomInput
              variant="outlined"
              name="nationality"
              label="Nationality"
              type="text"
              id="nationality"
              value={formData.nationality}
              onChange={handleFormChange}
              error={!!errors.nationality}
              helperText={errors.nationality}
              required
              haveTooltip
              tooltipText="What is your nationality?"
            />

            <CustomInput
              variant="outlined"
              name="numberOfBeneficieries"
              label="Number Of Beneficieries"
              type="text"
              id="numberOfBeneficieries"
              value={formData.numberOfBeneficieries}
              onChange={handleFormChange}
              error={!!errors.numberOfBeneficieries}
              helperText={errors.numberOfBeneficieries}
              required
              defaultValue={1}
              haveTooltip
              tooltipText="Enter number of beneficiaries"
            />
          </Stack>
        </CreateAccountFormDiv>

        // {item.nextOfKinArray.map((item, index) => (
        //   <CreateAccountFormDiv topLabel={`Next Of Kin ${index}` >
        //     <Stack direction="column" spacing={2}>
        //       <Stack
        //         direction="row"
        //         spacing={1}
        //         justifyContent="space-between"
        //       >
        //         <CustomInput
        //           variant="outlined"
        //           name="surname"
        //           label="Surname"
        //           type="text"
        //           id="surname"
        //           value={formData.surname}
        //           onChange={handleFormChange}
        //           error={!!errors.surname}
        //           helperText={errors.surname}
        //           required
        //         />
        //         <CustomInput
        //           variant="outlined"
        //           name="firstName"
        //           label="First Name"
        //           type="text"
        //           id="firstName"
        //           value={formData.firstName}
        //           onChange={handleFormChange}
        //           error={!!errors.firstName}
        //           helperText={errors.firstName}
        //           required
        //         />
        //         <CustomInput
        //           variant="outlined"
        //           name="middleName"
        //           label="Middle Name"
        //           type="text"
        //           id="middleName"
        //           value={formData.middleName}
        //           onChange={handleFormChange}
        //           error={!!errors.middleName}
        //           helperText={errors.middleName}
        //         />
        //       </Stack>

        //       <CustomInput
        //         variant="outlined"
        //         name="email"
        //         label="Email"
        //         type="text"
        //         id="email"
        //         value={formData.email}
        //         onChange={handleFormChange}
        //         error={!!errors.email}
        //         helperText={errors.email}
        //         required
        //         haveTooltip
        //         tooltipText="Enter Your Email"
        //       />

        //       <CustomInput
        //         variant="outlined"
        //         name="relationship"
        //         label="Relationship"
        //         type="text"
        //         id="relationship"
        //         value={formData.relationship}
        //         onChange={handleFormChange}
        //         error={!!errors.relationship}
        //         helperText={errors.relationship}
        //         required
        //       />

        //       <CustomInput
        //         variant="outlined"
        //         name="percentageBeneficiary"
        //         label="Percentage Beneficiary"
        //         type="number"
        //         id="percentageBeneficiary"
        //         value={formData.percentageBeneficiary}
        //         onChange={handleFormChange}
        //         error={!!errors.percentageBeneficiary}
        //         helperText={errors.percentageBeneficiary}
        //         required
        //       />
        //     </Stack>
        //   </CreateAccountFormDiv>
        // ))}
      ))}
    </Stack>
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
