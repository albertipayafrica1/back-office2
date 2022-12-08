import React from "react";
import PropTypes from "prop-types";
import FormikCustomInput from "../../atoms/FormikCustomInput";
import FormikCheckboxGroup from "../../atoms/FormikCheckboxGroup";
import FormikRadioGroup from "../../atoms/FormikRadioGroup";
import FormikDatePicker from "../../atoms/FormikDatePicker";
import FormikDateRangePicker from "../../atoms/FormikDateRangePicker";
import FormikAutoComplete from "../../atoms/FormikAutoComplete";
import FormikMultiSelect from "../../atoms/FormikMultiSelect";
import FormikFileUploadField from "../../atoms/DocumentUploadWithProgress";

const FormikControl = ({ control, ...rest }) => {
  switch (control) {
    case "input":
      return <FormikCustomInput {...rest} />;
    case "autocomplete":
      return <FormikAutoComplete {...rest} />;
    case "textarea":
      return <FormikCustomInput {...rest} />;
    case "select":
      return <FormikCustomInput {...rest} />;
    case "checkbox":
      return <FormikCheckboxGroup {...rest} />;
    case "radio":
      return <FormikRadioGroup {...rest} />;
    case "datePicker":
      return <FormikDatePicker {...rest} />;
    case "dateRangePicker":
      return <FormikDateRangePicker {...rest} />;
    case "multiSelect":
      return <FormikMultiSelect {...rest} />;
    case "singleFileUpload":
      return <FormikFileUploadField {...rest} />;
      
    default:
      return null;
  }
};

FormikControl.propTypes = {
  control: PropTypes.string.isRequired,
};

export default FormikControl;
