import { useRouter } from "next/router";
import PropTypes from "prop-types";

import { Typography, Stack, Button, Box } from "@mui/material";

import Dialog from "../../atoms/Dialog";
import TransactionButton from "../../atoms/TransactionButton";

import * as styles from "./styles";

const KycCompleteDialog = ({ open }) => {
  const router = useRouter();

  return (
    <Dialog
      open={open}
      backDropVisible={false}
      paperPropsStyling={styles.paperPropsStyling}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Box>
          <Typography sx={styles.title}>Thank you</Typography>
        </Box>
        <Box>
          <Typography variant="title6" sx={styles.completeButton}>
            Your submission has been received.
          </Typography>
        </Box>
        <Box>
          <Typography variant="title6">
            We will review your details and contact you soon.
          </Typography>
        </Box>

        <Button variant="orange" onClick={() => router.push("/dashboard/home")}>
          Back To Dashboard
        </Button>
      </Stack>
    </Dialog>
  );
};

KycCompleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default KycCompleteDialog;
