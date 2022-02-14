import { useState } from "react";

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleValueChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // handleCheckboxValueChange is only for checkboxes group
  const handleCheckboxValueChange = (e) => {
    const eventName = [e.target.name];
    const newArr = values[eventName];
    if (e.target.checked) {
      newArr.push(e.target.value);
      setValues({
        ...values,
        [e.target.name]: newArr,
      });
    } else {
      const index = newArr.indexOf(e.target.value);
      if (index > -1) {
        newArr.splice(index, 1);
      }
      setValues({
        ...values,
        [e.target.name]: newArr,
      });
    }
  };

  return [values, handleValueChange, handleCheckboxValueChange];
};

export default useForm;
