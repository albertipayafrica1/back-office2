import * as yup from "yup";

export const singleTransfer = yup.object({
  payoutMode: yup.string().required("Payout Mode is required"),

  accountId: yup.string().required("Account Id is required"),

  merchantRef: yup.string().required("Merchant Reference is required"),

  narration: yup.string().required("Narration is required"),

  amount: yup.string().required("Amount is required"),
});
