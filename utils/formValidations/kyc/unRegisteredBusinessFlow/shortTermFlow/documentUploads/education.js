import * as yup from "yup";

export const education = yup.object({
  feeStructure: yup
    .array(
      yup
        .object({
          url: yup.string().required("This file is required"),
        })
        .required("This file is required")
    )
    .min(1, "This file is required")
    .required("This file is required"),
  admissionLetter: yup
    .array(
      yup
        .object({
          url: yup.string().required("This file is required"),
        })
        .required("This file is required")
    )
    .min(1, "This file is required")
    .required("This file is required"),
});
