// import { useEffect, useState } from "react";
// import PropTypes from "prop-types";

// import { Stack } from "@mui/material";
// import { LoadingButton } from "@mui/lab";

// import { Formik, Form } from "formik";

// import FormikControl from "../../../../FormikControls/index";
// import MedicalContainer from "../../../../../atoms/CreateAccountFormDiv";
// import DownloadDiv from "../../../../../atoms/DownloadDiv";

// import { medical } from "../../../../../utils/formValidations/kyc/registeredBusinessFlow/documentUploads/medical";
// import { acknowledgement } from "../../../../../utils/formValidations/kyc/registeredBusinessFlow/documentUploads/acknowledgement";
// import { styles } from "../styles";

// const initialValues = {
//   hospitalAdmissionForm: [],
// };
// const initialValuesForAcknowledgement = { acknowledgmentDocument: [] };

// const Medical = ({ handleNextStep }) => {
//   const [formValues, setFormValues] = useState(null);
//   const [formValuesForAcknowledgement, setFormValuesForAcknowledgement] =
//     useState(null);
//   // const [individualFieldErrors, setIndividualFieldErrors] = useState({});
//   const [showAcknowledgementDiv, setShowAcknowledgementDiv] = useState(false);

//   // const handleFieldError = (fieldName, error) => {
//   //   setIndividualFieldErrors({ [fieldName]: error });
//   // };

//   const handleSubmit = async (values, formikHelpers) => {
//     // const isValid = await medical.isValid(values, {
//     //   abortEarly: false,
//     // });
//     // setIndividualFieldErrors({ f1: { error: "i am an error" } });
//     // handleNextStep();
//     setShowAcknowledgementDiv(true);
//   };

//   const handleAcknowledgementSubmit = async (values, formikHelpers) => {};

//   useEffect(() => {
//     const savedValues = {
//       hospitalAdmissionForm: [
//         {
//           file: { path: "elipa-Single-logos-black.png" },
//           errors: [],
//           id: 1,
//           url: "https://res.cloudinary.com/demo/image/upload/v1648551450/docs_uploading_example/elipa-Single-logos-black_fqcxd1.png",
//         },
//       ],
//     };
//     setFormValues(savedValues);
//   }, []);
//   return (
//     <Stack sx={styles.topContainer} spacing={3}>
//       <Formik
//         validationSchema={medical}
//         initialValues={formValues || initialValues}
//         onSubmit={handleSubmit}
//         enableReinitialize
//       >
//         {(formik) => {
//           return (
//             <Form>
//               <MedicalContainer topLabel="Sole Proprietorship">
//                 <Stack direction={{ xs: "column" }} spacing={{ xs: 3 }}>
//                   <FormikControl
//                     control="singleFileUpload"
//                     label="Hospital Admission Form"
//                     name="hospitalAdmissionForm"
//                     multiple={false}
//                     givenFile={
//                       formik.values.hospitalAdmissionForm !== undefined
//                         ? formik.values.hospitalAdmissionForm[0]
//                         : null
//                     }
//                   />
//                 </Stack>

//                 <LoadingButton
//                   loading={false}
//                   variant="contained"
//                   type="submit"
//                   size="large"
//                   sx={styles.submitButton}
//                   disabled={!formik.isValid || formik.isSubmitting}
//                 >
//                   Save
//                 </LoadingButton>
//               </MedicalContainer>
//             </Form>
//           );
//         }}
//       </Formik>

//       {showAcknowledgementDiv && (
//         <Formik
//           validationSchema={acknowledgement}
//           initialValues={
//             formValuesForAcknowledgement || initialValuesForAcknowledgement
//           }
//           onSubmit={handleAcknowledgementSubmit}
//           enableReinitialize
//         >
//           {(formik) => {
//             return (
//               <Form>
//                 <MedicalContainer topLabel="Acknowledgement Form">
//                   <Stack direction={{ xs: "column" }} spacing={{ xs: 3 }}>
//                     <DownloadDiv
//                       text="Download Our Terms And Conditions Form for signature"
//                       downloadUrl="https://www.irs.gov/pub/irs-pdf/fw8ben.pdf"
//                     />
//                     <FormikControl
//                       control="singleFileUpload"
//                       label="Upload signed acknowledgement document"
//                       name="acknowledgmentDocument"
//                       multiple={false}
//                       required
//                       givenFile={
//                         formik.values.acknowledgmentDocument !== undefined
//                           ? formik.values.acknowledgmentDocument[0]
//                           : null
//                       }
//                     />
//                     <LoadingButton
//                       loading={false}
//                       variant="contained"
//                       type="submit"
//                       size="large"
//                       sx={styles.submitButton}
//                       disabled={!formik.isValid || formik.isSubmitting}
//                     >
//                       Save And Next
//                     </LoadingButton>
//                   </Stack>
//                 </MedicalContainer>
//               </Form>
//             );
//           }}
//         </Formik>
//       )}
//     </Stack>
//   );
// };

// Medical.propTypes = {
//   handleNextStep: PropTypes.func.isRequired,
// };

// export default Medical;
