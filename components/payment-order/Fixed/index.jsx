import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { useSelector } from "react-redux";

import Cookies from "js-cookie";

import axios from "axios";

import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

import { Formik, Form } from "formik";
import { da } from "date-fns/locale";
import FormikControl from "../../FormikControls";

import TransactionButton from "../../../atoms/TransactionButton";
import * as styles from "../styles";

const index = () => {
  const router = useRouter();
  const { sid } = router.query;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const [error, setError] = useState();
  const [isMount, setIsMount] = useState(false);

  const companyRef = useSelector((state) => state.user.user.companyRef);

  useEffect(() => {
    setLoading(true);

    if (sid !== undefined) {
      const config = {
        method: "get",
        // url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/paymentlink/${companyRef}/gateway/${sid}`,
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/paymentlink/3d5dc989-e432-43d8-b6a2-cbdc1cc52ib9c/gateway/${sid}`,

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("iPayT")}`,
          "Device-Channel": "web",
        },
        withCredentials: true,
      };
      axios(config)
        .then((response) => {
          if (response.data.success === true) {
            console.log("This is the response", response);
            setData(response.data.response);
          } else {
            setError("Something Went Wrong");
          }
          setLoading(false);
        })
        .catch((err) => {});
    }
  }, [sid]);

  const handleSubmit = (values) => {
    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/paymentlink/3d5dc989-e432-43d8-b6a2-cbdc1cc52b9c/gateway`,
      headers: { "Content-Type": "application/json", "Device-Channel": "web" },
      data: JSON.stringify(values),
      withCredentials: true,
    };

    axios(config)
      .then((response) => {
        if (response.data.success) {
          window.location.href = response.data.response;
        } else {
          setError("Something Went Wrong");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mx: "auto", height: "100%", py: "2rem" }}>
      {data === undefined ? (
        <LinearProgress />
      ) : (
        <Paper elevation={3} sx={{ height: "100%" }}>
          <Stack py="1rem" direction="column" gap={2}>
            <Typography textAlign="center" sx={styles.title}>
              Edge City Communications limited has requested payment for order #
              {sid}
            </Typography>
            {/* Header banner */}
            <Stack sx={styles.banner} textAlign="center" spacing={2}>
              <Typography sx={styles.figure}>KES {data.amount}</Typography>
              <Typography variant="caption">Payment for</Typography>
              <Typography fontWeight="bold" fontSize={13}>
                {data.description}
              </Typography>
            </Stack>
            {/* form section */}
            <Stack direction="column" spacing={2} mx="2rem">
              <Typography textAlign="center" variant="caption">
                Verify your details to pay
              </Typography>

              <Formik
                initialValues={{
                  name: data.name,
                  amount: data.amount,
                  email: data.email,
                  phone: data.phone,
                  linkId: sid,
                  curr: "KES", // pick this from global curr value
                }}
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
                            label="phone"
                            placholder="07XXXXXX"
                            name="phone"
                            disabled
                            variant="outlined"
                            type="tel"
                            id="phone"
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
      )}
    </Container>
  );
};

export default index;
