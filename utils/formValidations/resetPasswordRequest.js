import * as yup from "yup";

export const resetPasswordRequest = yup.object().shape({
  email: yup
    .string()
    .email("Please Enter a valid Email")
    .required("Email is required"),
});
