import PropTypes from "prop-types";
import { Paper, Typography } from "@mui/material";
import * as styles from "./styles";

const TransactionSummaryCard = ({ title, body, variant }) => {
  let background = "";
  switch (variant) {
    case "pastelPink":
      background = "pastelPink";
      break;
    case "pastelGreen":
      background = "pastelGreen";
      break;
    case "pastelBlue":
      background = "pastelBlue";
      break;
    case "pastelOrange":
      background = "pastelOrange";
      break;
    default:
      background = "pastelPink";
  }

  return (
    <Paper
      sx={{
        backgroundColor: (theme) => theme.colors[background],
        ...styles.paper,
      }}
    >
      <Typography sx={styles.title} gutterBottom variant="subtitle6">
        {title}
      </Typography>
      <Typography variant="title4" sx={styles.body}>
        {body}
      </Typography>
    </Paper>
  );
};

TransactionSummaryCard.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

export default TransactionSummaryCard;
