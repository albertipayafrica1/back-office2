import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import axios from "axios";
import Cookies from "js-cookie";

import { Stack, Box, Typography, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

import { Formik, Form } from "formik";

import FormikControl from "../../FormikControls/index";

import Loader from "../../../atoms/Loader";
import MuiAlert from "../../../atoms/MuiAlert";
import TransactionButton from "../../../atoms/TransactionButton";

import { bulkTransfer } from "../../../utils/formValidations/payoutsNewTransfer/bulkTransfer";

import * as styles from "./styles";

const initialValues = {
  bulkTransferFile: [],
};

const BulkTransfer = () => {
  const router = useRouter();

  const [formValues, setFormValues] = useState(null);
  const [loading, setLoading] = useState(false);
  const [retrievalLoading, setRetrievalLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [savingAccountDetails, setSavingAccountDetails] = useState(false);

  const handleSubmit = (values, formikHelpers) => {
    // setLoading(true);
    // setAlert({ type: "", message: "" });
    // const credentials = Cookies.get("iPayT");
    // const config = {
    //   method: "post",
    //   url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/`,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${credentials}`,
    //   },
    //   data: JSON.stringify(values),
    //   withCredentials: true,
    // };
    // axios(config)
    //   .then((response) => {
    //     if (response.data.success === true) {
    //       setAlert({
    //         type: "success",
    //         message: "Bank Details Updated Successfully!",
    //       });
    //       setLoading(false);
    //       dispatch(fetchKycStatusSuccess(response.data.response.kycStatus));
    //       handleNextStep();
    //     } else {
    //       setAlert({ type: "error", message: "Something Went Wrong" });
    //       setLoading(false);
    //       formikHelpers.setSubmitting(false);
    //     }
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     if (error.response === undefined) {
    //       setAlert({ type: "error", message: "Something Went Wrong" });
    //     } else if (error.response.status === 401) {
    //       setAlert({ type: "error", message: error.response.data.response });
    //       setTimeout(() => {
    //         router.replace("/");
    //       }, 2000);
    //     } else if (error.response.status === 406) {
    //       formikHelpers.setErrors({ ...error.response.data.response });
    //       setAlert({ type: "error", message: "Kindly Resolve Form Errors" });
    //     } else if (error.response) {
    //       if (error.response.data.response !== undefined) {
    //         setAlert({
    //           type: "error",
    //           message: error.response.data.response,
    //         });
    //       } else {
    //         setAlert({
    //           type: "error",
    //           message: "Something Went Wrong",
    //         });
    //       }
    //     } else {
    //       setAlert({ type: "error", message: "Something Went Wrong" });
    //     }
    //     setLoading(false);
    //     formikHelpers.setSubmitting(false);
    //   });
  };

  return (
    <>
      <Stack sx={{ p: 8 }} spacing={8}>
        <Typography
          variant="subtitle5"
          sx={{ color: (theme) => theme.colors.blue }}
        >
          Upload CSV File To Initiate Bulk Payout Transfers
        </Typography>

        <Typography variant="subtitle5">Requirements</Typography>
        <Stack>
          <Typography variant="subtitle5">
            1. Mobile number must be in the format 254XXXXXXXXX
          </Typography>
          <Typography variant="subtitle5">
            2. Amount cannot contain commas or decimal places
          </Typography>
          <Typography variant="subtitle5">
            3. Amount must range from KES 100 - KES 300,000
          </Typography>
          <Typography variant="subtitle5">
            4. Reference numbers must be unique for each MPESA / Airtel Money /
            MPESA Till transaction
          </Typography>
          <Typography variant="subtitle5">
            5. Only CSV file format will be accepted. File cannot contain blank
            fields. Follow CSV samples provided below.
          </Typography>
          <Typography variant="subtitle5">
            6. Please note, you can make up to 3 payout transactions to one
            particular Mobile Money or Pesalink account, per day.
          </Typography>
        </Stack>

        <Stack>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ cursor: "pointer" }}
            onClick={() => {}}
          >
            <DownloadIcon sx={{ color: (theme) => theme.colors.orange }} />
            <Typography
              variant="subtitle5"
              sx={{ color: (theme) => theme.colors.blue }}
            >
              Download sample PesaLink CSV
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ cursor: "pointer" }}
            onClick={() => {}}
          >
            <DownloadIcon sx={{ color: (theme) => theme.colors.orange }} />
            <Typography
              variant="subtitle5"
              sx={{ color: (theme) => theme.colors.blue }}
            >
              Download sample MPESA / Airtel Money / MPESA Paybill / MPESA Till
              / iPay Merchant CSV
            </Typography>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            variant="subtitle5"
            sx={{ color: (theme) => theme.colors.orange }}
          >
            Upload Csv
          </Typography>
        </Stack>
        <Formik
          validationSchema={bulkTransfer}
          initialValues={formValues || initialValues}
          onSubmit={handleSubmit} // pass this as props
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form>
                <Stack spacing={5}>
                  <FormikControl
                    control="singleFileUpload"
                    label="Bulk Transfer csv file"
                    name="bulkTransferFile"
                    multiple={false}
                    required
                    givenFile={
                      formik.values.bulkTransferFile !== undefined
                        ? formik.values.bulkTransferFile[0]
                        : null
                    }
                  />

                  <Button
                    variant="orange"
                    sx={{ height: "50px" }}
                    type="submit"
                    disabled={
                      formik.values.bulkTransferFile.length === 0 ||
                      formik.isSubmitting
                    }
                    withoutIconMedia
                  >
                    Next
                  </Button>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </Stack>
      {alert.type !== "" && alert.message !== "" && (
        <MuiAlert variant={alert.type} message={alert.message} />
      )}
    </>
  );
};

export default BulkTransfer;
