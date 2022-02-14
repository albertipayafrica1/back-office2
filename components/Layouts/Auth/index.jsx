import PropTypes from "prop-types";

import { Grid, Loader } from "@mui/material";

import useStyle from "./styles";

function Account({ left, right, loading }) {
    const classes = useStyle();

    return (
        <div className={classes.root}>
            {loading ? (
                <Loader />
            ) : (
                <Grid container className={classes.content}>
                    <Grid item md={6}>
                        {left}
                    </Grid>
                    <Grid item md={6}>
                        {right}
                    </Grid>
                </Grid>
            )}
        </div>
    );
}

Account.defaultProps = {
    loading: false,
};

Account.propTypes = {
    left: PropTypes.node.isRequired,
    right: PropTypes.node.isRequired,
    loading: PropTypes.bool,
};

export default Account;
