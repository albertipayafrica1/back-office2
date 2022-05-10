import * as yup from "yup";

export const validationSchema = yup.object({
  email: yup
    .string()
    .strict()
    .trim("Kindly remove spaces before/after the email")
    .email("Please Enter a valid Email")
    .required("Email is required"),
  firstName: yup
    .string("Enter your First name")
    .required("First name is required"),

  lastName: yup
    .string("Enter your last name")
    .required("Last name is required"),

  yourCompanyName: yup.string().typeError("should be strings."),

  yourCompanyWebsite: yup.string().typeError("should be string"),

  mobileNumber: yup
    .string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    )
    .required("Mobile number is required"),

  subject: yup.string("Enter the subject").required("subject is required"),
});
