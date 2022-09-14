import * as yup from "yup";

export const filterDialog = yup.object().shape({
  transactionId: yup.string("Transaction id must be a string"),
  settlmentChannel: yup.string("Settlement Channel must be a string"),
  dateRange: yup
    .array()
    .of(yup.date("Select a valid date").nullable().typeError("Invalid Date"))
    .min(2, "You must have a start and an end date"),
  lastDays: yup.string("Last No. Of Days must be a string"),
  status: yup.string("Status must be a string"),
  settlementType: yup.string("Settlement Type must be a string"),
});
