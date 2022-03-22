import * as yup from "yup";

export const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  firstName: yup
    .string("Enter your First name")
    .required("first name is required"),

  lastName: yup
    .string("Enter your last name")
    .required("Last name is required"),

  // yourCompanyName: yup
  //   .string("Enter your Company name")
  //   .required("Company name is required"),

  // yourCompanyWebsite: yup
  //   .string("Enter your company website")
  //   .required("Company website is required"),

  mobileNumber: yup
    .string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    )
    .required("Mobile number required"),

  subject: yup.string("Enter the subject").required("subject is required"),
});
