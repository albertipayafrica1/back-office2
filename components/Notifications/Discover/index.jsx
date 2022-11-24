import { useState } from "react";
import PropTypes from "prop-types";

import { Stack, Typography } from "@mui/material";

import TransactionButton from "../../../atoms/TransactionButton";
import Table from "../../../atoms/Table";
import PageViewBox from "../../../atoms/PageViewBox";

import * as styles from "./styles";
import CustomAccordian from "../../../atoms/CustomAccordian";

const Summary = ({ title, time, shortDescription }) => {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={3} alignItems="center">
        <Typography
          variant="subtitle7"
          sx={{ color: (theme) => theme.colors.blue }}
        >
          {title}
        </Typography>
        <Typography
          variant="subtitle7"
          sx={{ color: (theme) => theme.colors.mono13 }}
        >
          {time}
        </Typography>
      </Stack>
      <Typography
        variant="subtitle7"
        sx={{ color: (theme) => theme.colors.mono5 }}
      >
        {shortDescription}
      </Typography>
    </Stack>
  );
};

const Details = ({ details }) => {
  return (
    <Stack spacing={2}>
      <Typography
        variant="subtitle7"
        sx={{ color: (theme) => theme.colors.mono5 }}
      >
        {details}
      </Typography>
    </Stack>
  );
};

const Discover = ({ data }) => {
  //   let givenRows = rows;
  //   if (rows === null || rows === undefined) {
  //     givenRows = [];
  //   }

  return (
    <Stack spacing={2}>
      {data.map(() => (
        <CustomAccordian
          summary={
            <Summary
              title="ddkdk"
              time="dfsfds"
              shortDescription="dfffffffffffffffffffffffffff"
            />
          }
          details={<Details details="sdsddssd" />}
        />
      ))}
    </Stack>
  );
};

// Discover.defaultProps = {
//   loading: false,
//   currentPage: 0,
// };

Discover.propTypes = {
  data: PropTypes.arrayOf({}).isRequired,
};

Summary.propTypes = {
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
};

Details.propTypes = {
  details: PropTypes.string.isRequired,
};

export default Discover;
