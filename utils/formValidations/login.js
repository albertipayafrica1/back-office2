import * as yup from "yup";

export const login = yup.object().shape({
  email: yup
    .string()
    .email("Please Enter a valid Email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
