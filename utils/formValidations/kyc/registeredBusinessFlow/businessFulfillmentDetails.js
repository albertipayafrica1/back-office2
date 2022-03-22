import * as yup from "yup";

export const businessFulfillmentDetails = yup.object({
  sellPhysicalGoodsOrServices: yup
    .string()
    .required("kindly select one of the below options"),
  shipProductYourself: yup
    .string("Enter your contact number")
    .required("kindly select one of the below options"),
  fulfillmentPeriod: yup
    .string()
    .required("Kindly select the fulfillment Period"),
});
