import * as yup from "yup";

export const createAccount = yup.object().shape({
  surname: yup
    .string("Surname must be a string")
    .required("Surname is required"),
  firstName: yup
    .string("First Name must be a string")
    .required("First Name is required"),
  middleName: yup.string("Middle Name must be a string"),
  contactNumber: yup
    .number("Enter your contact number")
    .required("Contact Number is required")
    .positive("Enter your contact number")
    .integer("Enter your contact number"),
  email: yup
    .string()
    .email("Please Enter a valid Email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmPassword: yup
    .string()
    .required("Please re-enter your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  countryOfOperation: yup
    .string()
    .required("Kindly select the country of you operation"),
  registrationDetails: yup
    .string()
    .required("kindly selection of the given options"),
  revenue: yup.string().required("Kindly select your estimated revenue"),
  businessType: yup.string().required(),
  ipayProducts: yup
    .array()
    .min(1, "Select atleast 1 item")
    .required("Select atleast 1 item"),
  aboutUs: yup.string(),
  referral: yup.string().required("Kindly enter the referral code"),
  ads: yup.string().required("Kindly select where you've seen the ad"),
  privacy: yup
    .array()
    .min(1, "Kindly accept the privacy policy")
    .required("Kindly accept the privacy policy"),
});
