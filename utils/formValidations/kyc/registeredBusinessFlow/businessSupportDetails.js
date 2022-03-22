import * as yup from "yup";

export const businessSupportDetails = yup.object({
  customerSupportAddress: yup.string().required("kindly enter the middle name"),
  customerSupportTelephoneNumber: yup
    .string("Enter your contact number")
    .required("Contact Number is required")
    .matches(
      /^((\\+[0-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Enter a valid phone number"
    ),
  customerSupportEmailAddress: yup
    .string()
    .email("Please Enter a valid Email")
    .required("Email is required"),
});
