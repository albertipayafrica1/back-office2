import React from "react";
import { useRouter } from "next/router";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";

import { Formik, Form, yupToFormErrors, validateYupSchema } from "formik";
import FormikControl from "../../FormikControls";

import TransactionButton from "../../../atoms/TransactionButton";
import * as styles from "../styles";

const initialValues = {
  name: "",
  email: "",
  telephoneNumber: "",
};

const handleSubmit = (values, formikHelpers) => {
  console.log(values);
};

const index = () => {
  const router = useRouter();
  const { sid } = router.query;
  console.log(sid);
  // awaiting intergrations
  return (
    <Container maxWidth="sm" sx={{ mx: "auto", height: "100%", py: "2rem" }}>
      <Paper elevation={3} sx={{ height: "100%" }}>
        <Stack py="1rem" direction="column" gap={2}>
          <Typography textAlign="center" sx={styles.title}>
            Edge City Communications limited has requested payment for order
            #8w27I9
          </Typography>
          {/* Header banner */}
          <Stack sx={styles.banner} textAlign="center" spacing={2}>
            <Typography sx={styles.figure}>KES 1000</Typography>
            <Typography variant="caption">Payment for</Typography>
            <Typography fontWeight="bold" fontSize={13}>
              Description goes here
            </Typography>
          </Stack>
          {/* form section */}
          <Stack direction="column" spacing={2} mx="2rem">
            <Typography textAlign="center" variant="caption">
              Verify your details to pay
            </Typography>

            <Formik
              initialValues={initialValues}
              enableReinitialize
              onSubmit={handleSubmit}
            >
              {(formik) => {
                return (
                  <Box>
                    <Form>
                      <Stack spacing={5}>
                        <FormikControl
                          control="input"
                          label="Name"
                          placholder="Enter Name"
                          name="name"
                          variant="outlined"
                          type="text"
                          id="fullName"
                          required
                          shrink
                        />
                        <FormikControl
                          control="input"
                          label="Email"
                          placholder="Enter Name"
                          name="email"
                          variant="outlined"
                          type="email"
                          id="email"
                          required
                          shrink
                        />
                        <FormikControl
                          control="input"
                          label="Telephone Number"
                          placholder="07XXXXXX"
                          name="telephoneNumber"
                          variant="outlined"
                          type="tel"
                          id="telephoneNumber"
                          required
                          shrink
                        />

                        <Stack
                          direction="column"
                          spacing={2}
                          sx={{ pt: "3rem" }}
                        >
                          <TransactionButton
                            text="PROCEED TO PAYMENT PAGE"
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ py: 2 }}
                          />

                          <Typography
                            variant="caption"
                            fontSize={9}
                            textAlign="center"
                          >
                            SECURED BY IPAY
                          </Typography>
                        </Stack>
                      </Stack>
                    </Form>
                  </Box>
                );
              }}
            </Formik>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default index;
