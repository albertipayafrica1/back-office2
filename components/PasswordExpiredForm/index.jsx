import Image from "next/image";
import Link from "next/link";

import PropTypes from "prop-types";

import { Stack, Box, Typography } from "@mui/material";

import { LoadingButton } from "@mui/lab";

import CustomInput from "../../atoms/CustomInput";
import MuiAlert from "../../atoms/MuiAlert";

import * as styles from "./styles";

const PasswordExpiredForm = ({
  handleSubmit,
  loading,
  formData,
  handleFormChange,
  errors,
  success,
}) => {
  return (
    <Box sx={styles.formContainer}>
      <Stack component="form" sx={styles.form} onSubmit={handleSubmit}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Image src="/iPay-logo.svg" alt="iPay Logo" width={78} height={39} />
        </Stack>

        <Typography variant="title6">Reset Password</Typography>

        <CustomInput
          variant="outlined"
          name="newPassword"
          label="New Password"
          type="password"
          id="newPassword"
          error={!!errors.newPassword}
          helperText={errors.newPassword}
          value={formData.newPassword}
          onChange={handleFormChange}
          sx={styles.textField}
        />
        <CustomInput
          variant="outlined"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          value={formData.confirmPassword}
          onChange={handleFormChange}
          sx={styles.textField}
        />
        <LoadingButton
          loading={loading}
          variant="contained"
          type="submit"
          size="large"
          sx={styles.submitButton}
          onClick={handleSubmit}
        >
          Reset Password
        </LoadingButton>
        <Stack spacing={2} mt={4}>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
            mr={4}
          >
            <Typography variant="title6" mr={2}>
              Need help?
            </Typography>
            <Link href="/">
              <a>
                <Typography variant="title6" sx={styles.contactUs}>
                  Contact Us
                </Typography>
              </a>
            </Link>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            mr={4}
          >
            <Typography variant="subtitle3">
              Authorised Payment Services Provider Regulated by the Central Bank
              of Kenya
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      {errors.generic !== "" && errors.generic && (
        <MuiAlert variant="error" message={errors.generic} />
      )}
      {success.status === true && (
        <MuiAlert variant="success" message={success.message} />
      )}
    </Box>
  );
};

PasswordExpiredForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  formData: PropTypes.shape({
    newPassword: PropTypes.string,
    confirmPassword: PropTypes.string,
  }).isRequired,
  handleFormChange: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    newPassword: PropTypes.string,
    confirmPassword: PropTypes.string,
    generic: PropTypes.string,
  }).isRequired,
  success: PropTypes.shape({
    status: PropTypes.bool,
    message: PropTypes.string,
  }).isRequired,
};
export default PasswordExpiredForm;
