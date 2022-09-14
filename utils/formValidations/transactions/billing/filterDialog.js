import * as yup from "yup";

export const filterDialog = yup.object().shape({
  transactionId: yup.string("Transaction id must be a string"),
  billerName: yup.string("Biller Name must be a string"),
  account: yup.string("Account must be a string"),
  lastDays: yup.string("Last No. Of Days must be a string"),
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
  billerCategory: yup.string("Biller Category must be a string"),
  earnings: yup
    .string()
    .test("earnings", "Kindly enter valid earnings", (val) => {
      if (val === undefined || val === null || val === "") {
        return true;
      }
      const parsedValue = parseInt(val, 10);

      if (parsedValue <= 0 || Number.isNaN(parsedValue)) {
        return false;
      }
      return true;
    }),
  billerRef: yup.string("Biller Reference must be a string"),
  dateRange: yup
    .array()
    .of(yup.date("Select a valid date").nullable().typeError("Invalid Date"))
    .min(2, "You must have a start and an end date"),
  status: yup.string("Status must be a string"),
});
