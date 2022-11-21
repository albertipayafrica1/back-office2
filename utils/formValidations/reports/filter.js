import * as yup from "yup";
import { differenceInMinutes } from "date-fns";

export const filter = yup.object().shape({
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
