import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

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

import { businessOwners } from "../../../../utils/formValidations/kyc/registeredBusinessFlow/businessOwners";
import { telephoneCodes } from "../../../../utils/data";
import { getTelephoneCountryCode } from "../../../../utils/countryOfOperation";

import {
  titleOptions,
  documentTypeOptions,
  shareHolderTypeOptions,
  documentTypeOptionsForNextOfKin,
} from "./data";

import { fetchKycStatusSuccess } from "../../../../redux";

import * as styles from "./styles";

const initialValues = {
  numberOfBeneficialOwners: "1",
  ultimateBeneficialOwners: [
    {
      title: "",
      surname: "",
      firstName: "",
      middleName: "",
      shareHolderType: "",
      otherShareHolderType: "",
      telephoneCountryCode: "KE",
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
          telephoneCountryCode: "KE",
          contactNumber: "",
          email: "",
          relationship: "",
          dateOfBirth: null,
          documentType: "1",
          documentNumber: "",
        },
      ],
    },
  ],
};

const BusinessOwnersForm = ({ handleNextStep }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

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
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/kyc/businessOwners`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials}`,
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

    const config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/kyc/businessOwners`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials}`,
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
      <Stack sx={{ padding: "2.5rem 0 0 0" }} spacing={1}>
        <Formik
          initialValues={formValues || initialValues}
          validationSchema={businessOwners}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form>
                <Stack spacing={8}>
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
                                telephoneCountryCode: user.countryIso,
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
                                    telephoneCountryCode: user.countryIso,
                                    contactNumber: "",
                                    email: "",
                                    relationship: "",
                                    dateOfBirth: null,
                                    documentType: "1",
                                    documentNumber: "",
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
                              required
                              row
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
                                {/* <FormikControl
                                  control="input"
                                  name={`ultimateBeneficialOwners[${index}].telephoneCountryCode`}
                                  label="Code"
                                  type="text"
                                  select
                                  selectItem={telephoneCodes}
                                  id={`ultimateBeneficialOwners[${index}].telephoneCountryCode`}
                                  required
                                /> */}
                                <FormikControl
                                  control="autocomplete"
                                  name={`ultimateBeneficialOwners[${index}].telephoneCountryCode`}
                                  label="Code"
                                  use="telephoneCountryCode"
                                  options={telephoneCodes}
                                  required
                                  defaultValue={getTelephoneCountryCode(
                                    formValues?.ultimateBeneficialOwners[index]
                                      ?.telephoneCountryCode
                                  )}
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
                              name={`ultimateBeneficialOwners[${index}].nationality`}
                              label="Nationality"
                              type="text"
                              id={`ultimateBeneficialOwners[${index}].nationality`}
                              required
                            />
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
                            <Stack
                              direction={{ xs: "column", md: "row" }}
                              spacing={3}
                            >
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

                          <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={3}
                          >
                            {formik.values.ultimateBeneficialOwners[index]
                              .documentType === "2" && (
                              <FormikControl
                                control="singleFileUpload"
                                label="Passport of Business Owner (front)"
                                name={`ultimateBeneficialOwners[${index}].passport`}
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
                            )}
                            <FormikControl
                              control="singleFileUpload"
                              label="Colored Passport Size Photo of Business Owner"
                              name={`ultimateBeneficialOwners[${index}].passportSizePhoto`}
                              multiple={false}
                              required
                              givenFile={
                                formik.values.ultimateBeneficialOwners[index]
                                  .passportSizePhoto !== undefined
                                  ? formik.values.ultimateBeneficialOwners[
                                      index
                                    ].passportSizePhoto[0]
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
                                  ? formik.values.ultimateBeneficialOwners[
                                      index
                                    ].pinCertificate[0]
                                  : null
                              }
                            />
                          </Stack>
                          <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={3}
                            sx={{ pt: 2 }}
                          >
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
                                  {/* <FormikControl
                                    control="input"
                                    name={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].telephoneCountryCode`}
                                    label="Code"
                                    type="text"
                                    select
                                    selectItem={telephoneCodes}
                                    id={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].telephoneCountryCode`}
                                    required
                                  /> */}
                                  <FormikControl
                                    control="autocomplete"
                                    name={`ultimateBeneficialOwners[${index}].nextOfKin[${index1}].telephoneCountryCode`}
                                    label="Code"
                                    use="telephoneCountryCode"
                                    options={telephoneCodes}
                                    required
                                    defaultValue={getTelephoneCountryCode(
                                      formValues?.ultimateBeneficialOwners[
                                        index
                                      ]?.nextOfKin[index1]?.telephoneCountryCode
                                    )}
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
      </Stack>
    </>
  );
};

BusinessOwnersForm.propTypes = {
  handleNextStep: PropTypes.func.isRequired,
};

export default BusinessOwnersForm;
