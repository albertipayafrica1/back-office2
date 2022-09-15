import * as yup from "yup";

export const filterDialog = yup.object().shape({
  subAccountId: yup.string("Sub Account Id must be a string"),
  subAccountMode: yup.string("Sub Account Mode must be a string"),
  dateRange: yup
    .array()
    .of(yup.date("Select a valid date").nullable().typeError("Invalid Date"))
    .min(2, "You must have a start and an end date"),
  email: yup
    .string()
    .strict()
    .trim("Kindly remove spaces before/after the email")
    .email("Please Enter a valid Email"),
  telephone: yup
    .string("Enter your contact number")
    .matches(
      /^((\\+[0-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Enter a valid phone number"
    ),
  reference: yup.string("Reference must be a string"),
});
