import { useState } from "react";
import PropTypes from "prop-types";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import * as styles from "./styles";

const CustomAccordian = ({ disabled, summary, details }) => {
  const [expanded, setExpanded] = useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <Accordion
      disabled={disabled}
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={styles.summary}
        Required
      >
        <Typography variant="subtitle4">{summary}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 5 }}>{details}</AccordionDetails>
    </Accordion>
  );
};

CustomAccordian.defaultProps = {
  disabled: false,
};

CustomAccordian.propTypes = {
  disabled: PropTypes.bool,
  summary: PropTypes.string.isRequired,
  details: PropTypes.node.isRequired,
};

export default CustomAccordian;
