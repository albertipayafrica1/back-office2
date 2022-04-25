import * as yup from "yup";

export const compliance = yup.object({
  citizen: yup.string().required("required"),
  resident: yup.string().when("citizen", (citizen) => {
    if (citizen === "1") {
      return yup.string().required("required");
    }
    return yup.string();
  }),
  greenCard: yup.string().when("citizen", (citizen) => {
    if (citizen === "1") {
      return yup.string().required("required");
    }
    return yup.string();
  }),
  born: yup.string().when("citizen", (citizen) => {
    if (citizen === "1") {
      return yup.string().required("required");
    }
    return yup.string();
  }),
  powerAuthority: yup.string().when("citizen", (citizen) => {
    if (citizen === "1") {
      return yup.string().required("required");
    }
    return yup.string();
  }),
  address: yup.string().when("citizen", (citizen) => {
    if (citizen === "1") {
      return yup.string().required("required");
    }
    return yup.string();
  }),
  mailAddress: yup.string().when("citizen", (citizen) => {
    if (citizen === "1") {
      return yup.string().required("required");
    }
    return yup.string();
  }),
  bankAccount: yup.string().when("citizen", (citizen) => {
    if (citizen === "1") {
      return yup.string().required("required");
    }
    return yup.string();
  }),
  telephone: yup.string().when("citizen", (citizen) => {
    if (citizen === "1") {
      return yup.string().required("required");
    }
    return yup.string();
  }),
  fatcaStatus: yup.string().when("citizen", (citizen) => {
    if (citizen === "1") {
      return yup.string().required("required");
    }
    return yup.string();
  }),
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
