import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import * as styles from "./styles";

const TestMode = ({ testModeStatus }) => {
  const router = useRouter();
  return (
    <Box
      onClick={() => router.push("/dashboard/kyc")}
      sx={testModeStatus ? styles.textModeOn : styles.testModeOff}
    >
      <Box sx={{ mr: 2, mt: 1 }}>
        <Image src="/Information icon.svg" width="13" height="13" />
      </Box>

      <Typography sx={styles.testModeText}>
        You’re in Test mode. Submit your business information to activate your
        account for Live transactions.
      </Typography>
    </Box>
  );
};

export default TestMode;

TestMode.propTypes = {
  testModeStatus: PropTypes.bool.isRequired,
};
