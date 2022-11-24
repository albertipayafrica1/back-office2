import * as yup from "yup";
import { differenceInMinutes } from "date-fns";

export const filterDialog = yup.object().shape({
  transactionId: yup.string("Transaction id must be a string"),
  settlmentChannel: yup.string("Settlement Channel must be a string"),
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
  status: yup.string("Status must be a string"),
  settlementType: yup.string("Settlement Type must be a string"),
});
