import * as yup from "yup";

export const filterDialog = yup.object().shape({
  user: yup.string("user must be a string"),
  role: yup.string("role must be a string"),
  ip: yup.string("ip must be a string"),
  details: yup.string("details must be a string"),
});
