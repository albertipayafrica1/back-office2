import { useState } from "react";
import PropTypes from "prop-types";

import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import * as styles from "./styles";

const Tabs = ({ tabTitle, children }) => {
  const [value, setValue] = useState("0");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} aria-label="tabs" sx={styles.tabs}>
            {tabTitle.map((title, index) => (
              <Tab label={title} value={index.toString()} />
            ))}
          </TabList>
        </Box>
        {children.map((child, index) => (
          <TabPanel value={index.toString()}>{child}</TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

Tabs.propTypes = {
  tabTitle: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
};

export default Tabs;
