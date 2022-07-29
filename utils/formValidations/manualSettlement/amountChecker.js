import * as yup from "yup";

export const amountChecker = (payInBalance) => {
  return yup.object().shape({
    partialAmount: yup
      .string()
      .test(
        "givn",
        "amount must be less than or equal to your Payin Balance",
        (val) => {
          if (val === undefined || val === null || val === "") {
            return false;
          }
          if (parseInt(payInBalance, 10) < parseInt(val, 10)) {
            return false;
          }
          return true;
        }
      )
      .required("amount is required"),
  });
};
