import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import axios from "axios";
import Cookies from "js-cookie";

import { Stack, Box, Typography, Button } from "@mui/material";

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
      <Stack sx={{ p: 8 }} spacing={5}>
        <Typography
          variant="subtitle5"
          sx={{ color: (theme) => theme.colors.blue }}
        >
          2. Bulk Transfer
        </Typography>

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
          <Box sx={{ cursor: "pointer" }} onClick={() => {}}>
            <img src="/Download-Arrow.svg" alt="download" />
            <Typography
              variant="subtitle5"
              sx={{ color: (theme) => theme.colors.blue, pl: 1 }}
            >
              Download Template
            </Typography>
          </Box>
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
                <Stack sx={{ width: "300px" }} spacing={5}>
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

                  <Stack direction="row" spacing={3}>
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
                      Initiate Transfer
                    </Button>

                    <TransactionButton
                      text="Reset Details"
                      onClick={() => {
                        return formik.resetForm();
                      }}
                    />
                  </Stack>
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
