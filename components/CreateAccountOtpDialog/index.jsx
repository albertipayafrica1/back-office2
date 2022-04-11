// import PropTypes from "prop-types";
// import { useState } from "react";
// import Link from "next/link";
// import { Box, Typography, Button } from "@mui/material";
// import { LoadingButton } from "@mui/lab";
// import { Formik, Form } from "formik";
// import axios from "axios";
// import Dialog from "../../atoms/Dialog/index";
// import Marquee from "../../atoms/Marquee/index";
// import FormikControl from "../FormikControls/index";
// import { validationSchema } from "../../utils/formValidations/callme";
// import MuiAlert from "../../atoms/MuiAlert";
// import { styles } from "./styles";

// const CallMeDialog = ({ open, handleToggleCallMeDemo }) => {
//   const [alert, setAlert] = useState(false);
//   const [error, setError] = useState(false);
//   const [Loading, SetLoading] = useState(false);

//   const initialValues = {
//     firstName: "",
//     lastName: "",
//     mobileNumber: "",
//   };

//   const handleSubmit = (values, { setErrors }) => {
//     setAlert(false);
//     SetLoading(true);

//     const config = {
//       method: "post",
//       url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/call-demo`,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       data: values,
//     };

//     axios(config)
//       .then((response) => {
//         console.log(response.data.success);
//         if (response.data.success) {
//           setAlert(true);
//           SetLoading(false);
//         }
//       })

//       .catch((errors) => {
//         if (error.response) {
//           if (errors.response.data.responseCode === 400) {
//             setErrors(errors.response.data.response);
//             setError(true);
//             SetLoading(false);
//           }
//         }
//         setError(true);
//         SetLoading(false);
//       });
//   };

//   return (
//     <div>
//       <Dialog
//         open={open}
//         onClose={handleToggleCallMeDemo}
//         position={styles.dialogueContainer}
//       />
//     </div>
//   );
// };

// export default CallMeDialog;

// CallMeDialog.propTypes = {
//   open: PropTypes.bool.isRequired,
//   handleToggleCallMeDemo: PropTypes.func.isRequired,
// };
