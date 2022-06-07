import * as yup from "yup";

export const bankDetails = yup.object({
  primaryAccount: yup.object({
    bankLocality: yup
      .string("Enter your Bank lacation")
      .required("Bank location is required"),
    bankName: yup
      .string("Enter your bank name")
      .required("Bank location is required"),
    bankBranch: yup
      .string("Enter bank branch")
      .required("Branch name is required"),
    accountName: yup
      .string("Enter your account name")
      .required("account name is required"),
    accountNumber: yup
      .string("Enter your account number")
      .required("Account number is required"),
    currency: yup
      .string("Enter your currency")
      .required("Currency is required"),
    swiftCode: yup
      .string("Enter your swift code")
      .required("Swift code is required"),
    secondary: yup
      .string("Kindly select an option")
      .required("Kindly select an option"),
  }),
  secondaryAccount: yup.object({
    bankLocality: yup
      .string("Enter your Bank location")
      .test("check", "Bank Location is required", function (value) {
        if (
          this.options.context.primaryAccount.secondary === "1" &&
          (value === "" || value === undefined)
        ) {
          return false;
        }

        return true;
      }),

    bankName: yup
      .string("Enter your bank name")
      .test("check", "Bank Name is required", function (value) {
        if (
          this.options.context.primaryAccount.secondary === "1" &&
          (value === "" || value === undefined)
        ) {
          return false;
        }

        return true;
      }),

    bankBranch: yup
      .string("Enter bank branch")
      .test("check", "Bank Branch is required", function (value) {
        if (
          this.options.context.primaryAccount.secondary === "1" &&
          (value === "" || value === undefined)
        ) {
          return false;
        }

        return true;
      }),

    accountName: yup
      .string("Enter your account name")
      .test("check", "Account Name is required", function (value) {
        if (
          this.options.context.primaryAccount.secondary === "1" &&
          (value === "" || value === undefined)
        ) {
          return false;
        }

        return true;
      }),

    accountNumber: yup
      .string("Enter your account number")
      .test("check", "Account Number is required", function (value) {
        if (
          this.options.context.primaryAccount.secondary === "1" &&
          (value === "" || value === undefined)
        ) {
          return false;
        }

        return true;
      }),

    currency: yup
      .string("Enter your currency")
      .test("check", "currency is required", function (value) {
        if (
          this.options.context.primaryAccount.secondary === "1" &&
          (value === "" || value === undefined)
        ) {
          return false;
        }

        return true;
      }),

    swiftCode: yup
      .string("Enter your swift code")
      .test("check", "Swift Code is required", function (value) {
        if (
          this.options.context.primaryAccount.secondary === "1" &&
          (value === "" || value === undefined)
        ) {
          return false;
        }

        return true;
      }),
  }),
});
