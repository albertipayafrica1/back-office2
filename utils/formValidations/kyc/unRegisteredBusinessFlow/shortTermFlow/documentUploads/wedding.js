import * as yup from "yup";

export const wedding = yup.object({
  letterFromInstitution: yup
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
