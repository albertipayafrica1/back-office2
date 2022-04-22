import * as yup from "yup";

export const compliance = yup.object({
  resident: yup.string().required("required"),
  citizen: yup.string().required("required"),
  greenCard: yup.string().required("required"),
  born: yup.string().required("required"),
  powerAuthority: yup.string().required("required"),
  address: yup.string().required("required"),
  mailAddress: yup.string().required("required"),
  bankAccount: yup.string().required("required"),
  telephone: yup.string().required("required"),
  fatcaStatus: yup.string().required("required"),

  explanation: yup
    .array(
      yup
        .object({
          url: yup.string().required("This file is required"),
        })
        .required("This file is required")
    )
    .when("fatcaStatus", (fatcaStatus) => {
      if (fatcaStatus === "1") {
        return yup
          .array(
            yup
              .object({
                url: yup.string().required("This file is required"),
              })
              .required("This file is required")
          )
          .min(1, "This file is required")
          .required("This file is required");
      }
      return yup.array(
        yup
          .object({
            url: yup.string().required("This file is required"),
          })
          .required("This file is required")
      );
    }),

  W8Form: yup
    .array(
      yup
        .object({
          url: yup.string().required("This file is required"),
        })
        .required("This file is required")
    )
    .when("fatcaStatus", (fatcaStatus) => {
      if (fatcaStatus === "1") {
        return yup
          .array(
            yup
              .object({
                url: yup.string().required("This file is required"),
              })
              .required("This file is required")
          )
          .min(1, "This file is required")
          .required("This file is required");
      }
      return yup.array(
        yup
          .object({
            url: yup.string().required("This file is required"),
          })
          .required("This file is required")
      );
    }),

  consent: yup.array().min(1, "You have to agree to continue"),
});
