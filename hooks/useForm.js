import { useState } from "react";

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleValueChange = (e) => {
    const country = window.location.href.substring(
      window.location.href.length - 2,
      window.location.href.length
    );
    const availableCountries = ["KE", "UG", "TG", "TZ"];
    if (
      e.target.name === "selectWithRedirect" &&
      e.target.value !== undefined &&
      e.target.value !== null
    ) {
      if (country !== e.target.value && availableCountries.includes(country)) {
        if (
          window.location.hostname === "127.0.0.1" ||
          window.location.hostname === "localhost"
        ) {
          window.location.href = `http://${window.location.hostname}:3000?country=${e.target.value}`;
        } else {
          window.location.href = `https://${window.location.hostname}?country=${e.target.value}`;
        }
      }
    }
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // handleCheckboxValueChange is only for checkboxes group
  const handleCheckboxGroupChange = (e) => {
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

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setValues({
        ...values,
        [e.target.name]: true,
      });
    } else {
      setValues({
        ...values,
        [e.target.name]: false,
      });
    }
  };

  return [
    values,
    handleValueChange,
    handleCheckboxGroupChange,
    handleCheckboxChange,
  ];
};

export default useForm;
