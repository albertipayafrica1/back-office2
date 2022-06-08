import { useState } from "react";
import PropTypes from "prop-types";

import { Box, Tab, useMediaQuery } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import * as styles from "./styles";

const Tabs = ({ tabTitle, children, positionStyles, icons }) => {
  const [value, setValue] = useState("0");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box sx={positionStyles}>
          <Box sx={{ ml: { xs: 12, md: 25 } }}>
            <TabList onChange={handleChange} aria-label="tabs" sx={styles.tabs}>
              {tabTitle.map((title, index) => (
                <Tab
                  icon={index < icons?.length ? icons[index] : null}
                  iconPosition="start"
                  disableRipple
                  label={title}
                  value={index.toString()}
                  sx={{ padding: 0 }}
                  key={title}
                />
              ))}
            </TabList>
          </Box>
        </Box>
        {children !== undefined &&
          children.map((child, index) => (
            <TabPanel value={index.toString()} key={index}>
              {child}
            </TabPanel>
          ))}
      </TabContext>
    </Box>
  );
};

Tabs.defaultProps = {
  positionStyles: {},
  icons: null,
};

Tabs.propTypes = {
  tabTitle: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
  positionStyles: PropTypes.shape({}),
  icons: PropTypes.arrayOf(PropTypes.node),
};

export default Tabs;
