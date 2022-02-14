// import Link from "next/link";

// import PropTypes from "prop-types";

// import { Stack, Box, Typography } from "@mui/material";

// import { LoadingButton } from "@mui/lab";

// import CustomInput from "../../atoms/CustomInput";
// import MuiAlert from "../../atoms/MuiAlert";

// import * as styles from "./styles";

// import { channel } from "./data";
// const SettlementDetails = (props) => {
//   return (
//     <Stack
//       sx={styles.formContainer}
//       component="form"
//       onSubmit={handleSubmit}
//       spacing={8}
//     >
//       <CustomInput
//         variant="outlined"
//         name="channel"
//         label="Choose Channel"
//         type="text"
//         select
//         selectItem={channel}
//         id="channel"
//         value={formData.channel}
//         onChange={handleFormChange}
//         error={!!errors.ads}
//         helperText={errors.channel}
//         required
//       />
//       <CustomInput
//         variant="outlined"
//         name="mobileMoneyChannel"
//         label="Choose Channel"
//         type="text"
//         select
//         selectItem={channel}
//         id="mobileMoneyChannel"
//         value={formData.mobileMoneyChannel}
//         onChange={handleFormChange}
//         error={!!errors.mobileMoneyChannel}
//         helperText={errors.mobileMoneyChannel}
//         required
//       />
//       <Typography variant="subtitle3">
//         Enter your mobile number (prefixed by 254)
//       </Typography>

//       <CustomInput
//         variant="outlined"
//         name="mobileNumber"
//         label="Mobile Number"
//         type="number"
//         id="mobileNumber"
//         value={formData.mobileNumber}
//         onChange={handleFormChange}
//         error={!!errors.mobileNumber}
//         helperText={errors.mobileNumber}
//         required
//       />
//       <CustomInput
//         variant="outlined"
//         name="bankLocality"
//         label="Bank Locality"
//         type="text"
//         id="bankLocality"
//         value={formData.bankLocality}
//         onChange={handleFormChange}
//         error={!!errors.bankLocality}
//         helperText={errors.Locality}
//         required
//       />
//       <LoadingButton
//         loading={loading}
//         variant="contained"
//         type="submit"
//         size="large"
//         sx={styles.submitButton}
//         onClick={handleSubmit}
//       >
//         Save and Next
//       </LoadingButton>
//     </Stack>
//   );
// };

// export default SettlementDetails;
