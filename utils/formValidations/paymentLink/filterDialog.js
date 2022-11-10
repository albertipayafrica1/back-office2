import * as yup from "yup";
import { differenceInMinutes } from "date-fns";

export const filterDialog = yup.object().shape({
  linkId: yup.string("Link id must be a string"),
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
  lastDays: yup.string("Last No. Of Days must be a string"),
  description: yup.string("description must be a string"),
  status: yup.string("Status must be a string"),
  amount: yup.string().test("amount", "Kindly enter a valid amount", (val) => {
    if (val === undefined || val === null || val === "") {
      return true;
    }
    const parsedValue = parseInt(val, 10);

    if (parsedValue <= 0 || Number.isNaN(parsedValue)) {
      return false;
    }
    return true;
  }),
  orderId: yup.string("Order Id must be a string"),
  dateCreated: yup
    .array()
    .of(yup.date("Select a valid date").nullable().typeError("Invalid Date"))
    .min(2, "You must have a start and an end date")
    .test("dateCreated", "enter a correct date range", (val) => {
      if (val[1] === null && val[0] === null) {
        return true;
      }
      return differenceInMinutes(val[1], val[0]) >= 0;
    }),
});
