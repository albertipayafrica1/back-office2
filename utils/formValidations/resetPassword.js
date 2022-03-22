import * as yup from "yup";

export const resetPassword = yup.object().shape({
  newPassword: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/,
      "Your Password must contain atleast 8 characters, one uppercase, one lowercase, one number and one special case character"
    ),
  confirmPassword: yup
    .string()
    .required("Please re-enter your password")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});
