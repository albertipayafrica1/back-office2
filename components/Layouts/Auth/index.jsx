import PropTypes from "prop-types";

import { Grid, Loader } from "@mui/material";

import useStyle from "./styles";

const Account = ({ left, right, loading }) => {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      {loading ? (
        <Loader />
      ) : (
        <Grid container className={classes.content}>
          <Grid item sm={6}>
            {left}
          </Grid>
          <Grid item sm={6} className={classes.left}>
            {right}
          </Grid>
        </Grid>
      )}
    </div>
  );
};

Account.defaultProps = {
  loading: false,
};

Account.propTypes = {
  left: PropTypes.node.isRequired,
  right: PropTypes.node.isRequired,
  loading: PropTypes.bool,
};

export default Account;
