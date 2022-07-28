import { useState } from "react";
import PropTypes from "prop-types";

import { Box, Tab, useMediaQuery } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import * as styles from "./styles";

const Tabs = ({ tabTitle, children, positionStyles, icons }) => {
  const [value, setValue] = useState("0");
  const matches = useMediaQuery("(min-width:930px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let tabStyle = {
    minWidth: 100,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 0,
    paddingTop: 0,
    backgroundColor: "white",
  };
  let tabClass = {};
  let labelStyle = {};

  if (!matches) {
    tabStyle.minWidth = 50;
    tabStyle.paddingLeft = 4;
    tabStyle.paddingRight = 4;
    tabStyle.letterSpacing = "-.04em";
    tabClass = { labelContainer: { paddingLeft: 0, paddingRight: 0 } };
    labelStyle = { fontSize: "10px" };
  }

  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box sx={positionStyles}>
          <Box
            sx={{
              ml: { xs: 3, md: 15 },
            }}
          >
            <TabList onChange={handleChange} aria-label="tabs" sx={styles.tabs}>
              {tabTitle.map((title, index) => (
                <Tab
                  icon={index < icons?.length ? icons[index] : null}
                  iconPosition="start"
                  disableRipple
                  value={index.toString()}
                  sx={{
                    "& .MuiTabs-flexContainer": {
                      flexWrap: "wrap",
                    },
                  }}
                  key={title}
                  label={<span style={labelStyle}>{title}</span>}
                  classes={tabClass}
                  style={tabStyle}
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
