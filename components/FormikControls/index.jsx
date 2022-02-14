import React from "react";
import PropTypes from "prop-types";
import FormikCustomInput from "../../atoms/FormikCustomInput";
import FormikCheckboxGroup from "../../atoms/FormikCheckboxGroup";
import FormikRadioGroup from "../../atoms/FormikRadioGroup";

const FormikControl = ({ control, ...rest }) => {
  switch (control) {
    case "input":
      return <FormikCustomInput {...rest} />;
    case "textarea":
      return <FormikCustomInput {...rest} />;
    case "select":
      return <FormikCustomInput {...rest} />;
    case "checkbox":
      return <FormikCheckboxGroup {...rest} />;
    case "radio":
      return <FormikRadioGroup {...rest} />;
    default:
      return null;
  }
};

FormikControl.propTypes = {
  control: PropTypes.string.isRequired,
};

export default FormikControl;
