import * as yup from "yup";

export const compliance = yup.object({
  consent: yup.array().min(1, "You have to agree to continue"),
});
