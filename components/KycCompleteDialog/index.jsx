import { useRouter } from "next/router";
import PropTypes from "prop-types";

import { Typography, Stack, Box, useMediaQuery } from "@mui/material";

import Dialog from "../../atoms/Dialog";

import * as styles from "./styles";

const KycCompleteDialog = ({ open }) => {
  const router = useRouter();

  return (
    <div>
      <Dialog
        open={open}
        backDropVisible={false}
        paperPropsStyling={styles.paperPropsStyling}
      >
        <Stack sx={styles.formContainer} spacing={8}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Typography
              variant="title6"
              sx={styles.completeButton}
              onClick={() => router.push("/dashboard/home")}
            >
              Congratulations, You&apos;ve Completed your Kyc.
            </Typography>

            <Typography
              variant="subtitle5"
              sx={styles.dashboardButton}
              onClick={() => router.push("/dashboard/home")}
            >
              GO TO DASHBOARD
            </Typography>
          </Stack>
        </Stack>
      </Dialog>
    </div>
  );
};

KycCompleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default KycCompleteDialog;
