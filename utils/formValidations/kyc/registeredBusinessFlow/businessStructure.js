import * as yup from "yup";

export const businessStructure = yup.object({
  email: yup
    .string()
    .email("Please Enter a valid Email")
    .required("Email is required"),
  directors: yup.string().min(1).max(10).required("directros required"),
  password: yup.string().required("Its Required"),
  // description: Yup.string().required("Required"),
  countryOfOperation: yup.string().required("Required"),
  radioOption: yup.string().required("Required"),
  // ipayProducts: Yup.array().required("Required"),
  // birthDate: Yup.date().required("Required").nullable(),
});
