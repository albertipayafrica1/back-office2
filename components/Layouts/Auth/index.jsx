import PropTypes from "prop-types";

import { Grid, CircularProgress, Box, Typography } from "@mui/material";

import useStyle from "./styles";

const Account = ({ left, right, loading, alert, nameOnAlert }) => {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {alert && (
            <Box className={classes.alert}>
              <Typography variant="subtitle3" className={classes.whiteText}>
                {"Hi "}
                <span variant="subtitle3" className={classes.blueText}>
                  {nameOnAlert}
                </span>
                <span variant="subtitle4" className={classes.whiteText}>
                  {" Almost there! "}
                </span>
                <span variant="subtitle3" className={classes.whiteText}>
                  Check your email address for verification
                </span>
              </Typography>
            </Box>
          )}
          <Grid container>
            <Grid item sm={6} xs={0} className={classes.left}>
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
