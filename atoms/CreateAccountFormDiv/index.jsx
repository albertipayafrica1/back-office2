import PropTypes from "prop-types";

import styles from "./CreateAccountFormDiv.module.css";

const CreateAccountFormDiv = ({ topLabel, children }) => {
    return (
        <div className={styles.formGroup}>
            <label>{topLabel}</label>
            <div>{children}</div>
        </div>
    );
};

export default CreateAccountFormDiv;

CreateAccountFormDiv.defaultProps = {
    label: "",
};

CreateAccountFormDiv.propTypes = {
    label: PropTypes.string,
    children: PropTypes.node.isRequired,
};
