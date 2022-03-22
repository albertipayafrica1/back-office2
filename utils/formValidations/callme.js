import * as yup from "yup";

export const validationSchema = yup.object({
  mobileNumber: yup
    .string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    )
    .required("Mobile number required"),
  firstName: yup
    .string("Enter your First name")
    .required("Firsr name is required"),

  lastName: yup
    .string("Enter your last name")
    .required("Last name is required"),
});
