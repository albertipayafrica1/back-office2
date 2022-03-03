import PropTypes from "prop-types";

import { Grid, Loader, Box, Typography } from "@mui/material";

import useStyle from "./styles";

const Account = ({ left, right, loading, alert, nameOnAlert }) => {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {alert && (
            <Box className={classes.alert}>
              <Typography variant="subtitle3" className={classes.whiteText}>
                {"Hi "}
              </Typography>
              <Typography variant="subtitle3" className={classes.blueText}>
                {nameOnAlert}
              </Typography>
              <Typography variant="subtitle4" className={classes.whiteText}>
                {"Almost there! "}
              </Typography>
              <Typography variant="subtitle3" className={classes.whiteText}>
                Check your email address for verification
              </Typography>
            </Box>
          )}
          <Grid container>
            <Grid item sm={6} className={classes.left}>
              {left}
            </Grid>
            <Grid item sm={6}>
              {right}
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

Account.defaultProps = {
  loading: false,
  alert: false,
  nameOnAlert: "",
};

Account.propTypes = {
  left: PropTypes.node.isRequired,
  right: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  alert: PropTypes.bool,
  nameOnAlert: PropTypes.string,
};

export default Account;
