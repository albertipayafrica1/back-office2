import PropTypes from "prop-types";

import { Grid } from "@mui/material";

import FormikControl from "../../../FormikControls/index";

import * as styles from "./styles";

const bankInputs = [
  {
    label: "Bank Name",
    name: "bankName",
  },
  {
    label: "Account Name",
    name: "accountName",
  },
  {
    label: "Transfer Charge",
    name: "transferCharge",
  },
  {
    label: "Bank Branch",
    name: "bankBranch",
  },
  {
    label: "Account Number",
    name: "accountNumber",
  },
];

const getChannelArrays = (name) => {
  if (name === "bank") {
    return bankInputs;
  }
  return bankInputs;
};

const ChannelDetails = ({ name }) => {
  const inputs = getChannelArrays(name);

  return (
    <Grid container spacing={6}>
      {inputs.map((input, index) => (
        <Grid item md={4} xs={0} key={index} sx={{ width: "100%" }}>
          <FormikControl
            control="input"
            label={input.label}
            name={input.name}
            variant="outlined"
            type="text"
            id={input.name}
            sx={styles.textField}
            disabled
          />
        </Grid>
      ))}
    </Grid>
  );
};

ChannelDetails.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ChannelDetails;
