import PropTypes from "prop-types";

import styles from "./CreateAccountFormDiv.module.css";

const CreateAccountFormDiv = ({ topLabel, children }) => {
  return (
    <div className={styles.formGroup}>
      <label id="topLabel" htmlFor="topLabel">
        {topLabel}
      </label>
      <div>{children}</div>
    </div>
  );
};

export default CreateAccountFormDiv;

CreateAccountFormDiv.defaultProps = {
  topLabel: "",
};

CreateAccountFormDiv.propTypes = {
  topLabel: PropTypes.string,
  children: PropTypes.node.isRequired,
};
