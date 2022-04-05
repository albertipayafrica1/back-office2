import { useEffect, useState } from "react";
import { Stack, Box, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import { LoadingButton } from "@mui/lab";
import FormikControl from "../../../FormikControls/index";
import { ComplianceResponse, consent } from "./data";
import DownloadDiv from "../../../../atoms/DownloadDiv";
import ComplianceFormContainer from "../../../../atoms/CreateAccountFormDiv";
import { compliance } from "../../../../utils/formValidations/kyc/unRegisteredBusinessFlow/compliance";
import { styles } from "./styles";

const initialValues = {
  resident: "",
  greenCard: "",
  born: "",
  powerAuthority: "",
  address: "",
  mailAddress: "",
  bankAccount: "",
  telephone: "",
  fatcaStatus: "",
  explanation: [],
  W8Form: [],
  consent: [],
};

const ComplianceForm = () => {
  const [formValues, setFormValues] = useState(null);

  const handleSubmit = (values, formikHelpers) => {
    console.log(JSON.stringify(values, null, 2));
  };

  useEffect(() => {
    const savedValues = {
      // this you get it from api call
      resident: "",
      greenCard: "",
      born: "",
      powerAuthority: "",
      address: "",
      mailAddress: "",
      bankAccount: "",
      telephone: "",
      fatcaStatus: "",
      explanation: [],
      W8Form: [],
      consent: [],
    };
    setFormValues(savedValues);
  }, []);

  return (
    <Stack sx={styles.topContainer} spacing={1}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={formValues || initialValues}
        validationSchema={compliance}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              <ComplianceFormContainer topLabel="Foreign Account Tax Compliance Act (FATCA)">
                <Box sx={styles.innerContainer}>
                  <Box sx={styles.radioButtonContainer}>
                    <FormikControl
                      control="radio"
                      label="1. Are you a U.S resident"
                      name="resident"
                      options={ComplianceResponse}
                    />
                  </Box>
                </Box>

                <Box sx={styles.innerContainer}>
                  <Box sx={styles.radioButtonContainer}>
                    <FormikControl
                      control="radio"
                      label="3. Are you holding a U.S. Permanent Resident Card (Green
                    Card)?"
                      name="greenCard"
                      options={ComplianceResponse}
                    />
                  </Box>
                </Box>
                <Box sx={styles.innerContainer}>
                  <Box sx={styles.radioButtonContainer}>
                    <FormikControl
                      control="radio"
                      label="4. Were you born in the U.S"
                      name="born"
                      options={ComplianceResponse}
                    />
                  </Box>
                </Box>
                <Box sx={styles.innerContainer}>
                  <Box sx={styles.radioButtonContainer}>
                    <FormikControl
                      control="radio"
                      label="5. Have you granted power of attorney or signatory authority to a person with a U.S. address?"
                      name="powerAuthority"
                      options={ComplianceResponse}
                    />
                  </Box>
                </Box>
                <Box sx={styles.innerContainer}>
                  <Box sx={styles.radioButtonContainer}>
                    <FormikControl
                      control="radio"
                      label="6. Do you have a U.S. residential address?"
                      name="address"
                      options={ComplianceResponse}
                    />
                  </Box>
                </Box>
                <Box sx={styles.innerContainer}>
                  <Box sx={styles.radioButtonContainer}>
                    <FormikControl
                      control="radio"
                      label="7. Do you have a correspondence, C/O or Hold mail address in
                    the U.S.?"
                      name="mailAddress"
                      options={ComplianceResponse}
                    />
                  </Box>
                </Box>
                <Box sx={styles.innerContainer}>
                  <Box sx={styles.radioButtonContainer}>
                    <FormikControl
                      control="radio"
                      label="8. Do you have a standing order to a U.S. Bank Account?"
                      name="bankAccount"
                      options={ComplianceResponse}
                    />
                  </Box>
                </Box>

                <Box sx={styles.innerContainer}>
                  <Box sx={styles.radioButtonContainer}>
                    <FormikControl
                      control="radio"
                      label="9. Do you have a U.S. telephone number?"
                      name="telephone"
                      options={ComplianceResponse}
                    />
                  </Box>
                </Box>
                <Box sx={styles.innerContainer}>
                  <Box sx={styles.radioButtonContainer}>
                    <FormikControl
                      control="radio"
                      label="FATCA Status"
                      name="fatcaStatus"
                      options={ComplianceResponse}
                    />
                  </Box>
                </Box>
                <Box>
                  {formik.values.fatcaStatus === "1" && (
                    <Box>
                      <Box sx={styles.fatcaStatusContainer}>
                        <Typography sx={styles.subtitle3} variant="subtitle3">
                          IF Yes, Document to be completed
                        </Typography>

                        <Typography sx={styles.subtitle3} variant="subtitle3">
                          1. Form W-8BEN (Non U.S. Persons only)
                        </Typography>
                      </Box>

                      <Box sx={styles.uploadContainer}>
                        <DownloadDiv
                          text="Download W-8BEN form hear "
                          downloadUrl="https://www.irs.gov/pub/irs-pdf/fw8ben.pdf"
                        />
                      </Box>
                      <Box sx={styles.uploadContainer}>
                        <FormikControl
                          control="singleFileUpload"
                          label="Form W-8BEN (Non U.S. Persons only)"
                          name="W8Form"
                          mulitple={false}
                          required
                          givenFile={
                            formik.values.W8Form !== undefined
                              ? formik.values.W8Form[0]
                              : null
                          }
                        />
                      </Box>

                      <Box sx={styles.uploadContainer}>
                        <FormikControl
                          control="singleFileUpload"
                          label="Written explanation for US born non-US citizens (Confirmation of renunciation of U.S. Citizenship / reason for not taking up U.S citizenship at birth)"
                          name="explanation"
                          mulitple={false}
                          required
                          givenFile={
                            formik.values.explanation !== undefined
                              ? formik.values.explanation[0]
                              : null
                          }
                        />
                      </Box>
                    </Box>
                  )}
                </Box>
                <Box />
              </ComplianceFormContainer>

              <Box sx={styles.dataProcessingContainer}>
                <ComplianceFormContainer topLabel="Data Processing Consent *">
                  <Box sx={styles.dataProcessingInnerContainer}>
                    <Typography variant="subtitle3">
                      I hereby agree and give consent as follows:
                    </Typography>
                    <Typography
                      sx={styles.dataProcessingTitle}
                      variant="subtitle3"
                    >
                      i. That iPay may collect, use, disclose and process my
                      personal information set out in my online application
                      form, account opening document and/or otherwise provided
                      by me or my authorized representative or prosed by iPay
                      for one or more of the purposes as stated in the iPay’s
                      Data Privacy Statement.
                    </Typography>
                    <Typography
                      sx={styles.dataProcessingTitle}
                      variant="subtitle3"
                    >
                      ii. My Personal data may/ will be disclosed by iPay
                      service providers or agents (including but not limited to
                      its auditors, lawyers/ law firms, partner banks) which may
                      be sited outside of Kenya, for one or more of the
                      purposes, as such third party service providers or agents,
                      if engaged by iPay, would be processing my personal data
                      for iPay for one or more of the purposes set out in that
                      Data Privacy Statement.
                    </Typography>
                    <Typography
                      sx={styles.dataProcessingTitle}
                      variant="subtitle3"
                    >
                      iii. I am aware that I may withdraw my consent at any time
                      by using the iPay Consent Withdraw Form available in the
                      iPay Portal. iv. By submitting this online Form, I
                      represent and warrant that I am the user and / or
                      subscriber of the personal data as set out in my
                      application form and/or otherwise provided by me or my
                      authorized representative or possessed by iPay, and that I
                      have read and understood all of the above provisions,
                      including the Data Privacy Statement availed at
                      (iPayafrica.com)
                    </Typography>

                    <Typography
                      sx={styles.dataProcessingTitle}
                      variant="subtitle3"
                    >
                      v. I/We authorize iPay to process my/our sensitive
                      personal data both within and outside kenya, in accordance
                      with our Privacy Statement. vi. I/We authorize iPay to
                      process my/our personal data for analytics/ market
                      research or for marketing/advertising or for similar
                      commercial purposes in accordance with the Privacy
                      Statement.
                    </Typography>

                    <Box sx={{ mt: 10 }}>
                      <FormikControl
                        control="checkbox"
                        name="consent"
                        options={consent}
                      />
                    </Box>
                  </Box>
                </ComplianceFormContainer>
              </Box>

              <LoadingButton
                loading={false}
                variant="contained"
                type="submit"
                size="large"
                sx={styles.submitButton}
                disabled={!formik.isValid}
              >
                Save and Next
              </LoadingButton>
            </Form>
          );
        }}
      </Formik>
      <Box />
    </Stack>
  );
};

export default ComplianceForm;
