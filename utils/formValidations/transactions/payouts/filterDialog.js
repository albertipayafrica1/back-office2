import * as yup from "yup";
import { differenceInMinutes } from "date-fns";

export const filterDialog = yup.object().shape({
  transactionId: yup.string("Transaction id must be a string"),
  paymentChannel: yup.string("Payment Channel must be a string"),
  orderId: yup.string("Order Id must be a string"),
  lastDays: yup.string("Last No. Of Days must be a string"),
  email: yup
    .string()
    .strict()
    .trim("Kindly remove spaces before/after the email")
    .email("Please Enter a valid Email"),
  category: yup.string("Category must be a string"),
  merchantRef: yup.string("Merchant Reference must be a string"),
  telephone: yup
    .string("Enter your contact number")
    .matches(
      /^((\\+[0-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Enter a valid phone number"
    ),
  dateRange: yup
    .array()
    .of(yup.date("Select a valid date").nullable().typeError("Invalid Date"))
    .min(2, "You must have a start and an end date")
    .test("dateRange", "Invalid date range", (val) => {
      if (val === "" || val === undefined || val === null) {
        return true;
      }
      return differenceInMinutes(new Date(val[1]), new Date(val[0])) >= 0;
    }),
});
