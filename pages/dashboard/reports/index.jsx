import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { format, parseISO } from "date-fns";

import { Form, Formik } from "formik";
import axios from "axios";
import Cookies from "js-cookie";

import { Typography, Stack, Box, useMediaQuery } from "@mui/material";

import CustomAccordian from "../../../atoms/CustomAccordian";
import PageViewBox from "../../../atoms/PageViewBox";
import TransactionButton from "../../../atoms/TransactionButton";
import Loader from "../../../atoms/Loader";

import Table from "../../../atoms/Table";
import FormikControl from "../../../components/FormikControls";
import DashboardLayout from "../../../components/Layouts/Dashboard";
import ProtectedRoute from "../../../components/ProtectedRoute";

import { filter } from "../../../utils/formValidations/reports/filter";

const columns = [
  // { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "report",
    label: "Report",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "fromDate",
    label: "From Date",
    minWidth: 170,
    align: "center",
  },
  {
    id: "toDate",
    label: "To Date",
    minWidth: 170,
    align: "center",
  },
  {
    id: "download",
    label: "Download",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
    onClick: () => {},
  },
];

const Reports = () => {
  const matches = useMediaQuery("(min-width:930px)");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [rowData, setRowData] = useState([
    {
      report: "Payouts",
      fromDate: "",
      toDate: "",
      download: "",
    },
    {
      report: "Payout Refunds",
      fromDate: "",
      toDate: "",
      download: "",
    },
  ]);

  const [error, setError] = useState("");

  const initialValues = {
    dateRange: [null, null],
  };

  const handleSubmit = (values) => {
    router.push(
      {
        pathname: `${router.pathname}`,
        query: {
          page: 0,
          fromDate: `${values.dateRange[0]}`,
          toDate: `${values.dateRange[1]}`,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  useEffect(() => {
    setLoading(true);

    const toChangeRowData = rowData;
    toChangeRowData[0].fromDate = router.query?.fromDate;
    toChangeRowData[1].fromDate = router.query?.fromDate;
    toChangeRowData[0].toDate = router.query?.toDate;
    toChangeRowData[1].toDate = router.query?.toDate;

    setRowData([...toChangeRowData]);
    setLoading(false);
  }, [router.query]);

  // if (loading) {
  //   return <Loader />;
  // }

  // if (data.length === 0 || error !== "") {
  //   return (
  //     <Stack alignItems="center" sx={{ width: "100%" }}>
  //       <Typography variant="title4">
  //         {!error ? "No Records found " : error}
  //       </Typography>
  //     </Stack>
  //   );
  // }

  return (
    <Box sx={{ p: 10 }}>
      <Box sx={{ ml: 6, pb: 3 }}>
        <Typography variant="subtitle6">Download Reports</Typography>
      </Box>
      <PageViewBox>
        <Stack
          direction="column"
          sx={{
            background: "white",
            borderRadius: "5px",
            p: 10,
            width: "100%",
          }}
          spacing={3}
        >
          <Stack
            sx={{
              background: (theme) => theme.colors.mono,
              color: (theme) => theme.colors.mono5,
            }}
            justifyContent="flex-end"
            alignItems="center"
            direction={{ xs: "column", md: "row" }}
          >
            <Typography variant="subtitle6">Filter By Date Range</Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={filter}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {(formik) => {
                return (
                  <Form>
                    <Stack sx={{ padding: "1rem" }} spacing={8}>
                      <Stack direction="column" spacing={2}>
                        <Stack
                          direction={{ xs: "column", md: "row" }}
                          spacing={2}
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <FormikControl
                            control="dateRangePicker"
                            labelStart="From"
                            labelEnd="To"
                            name="dateRange"
                            onChange={(val) => {
                              formik.setFieldValue("dateRange", val);
                            }}
                          />
                          <Box
                            sx={matches ? { width: "20%" } : { width: "100%" }}
                          >
                            <TransactionButton
                              text="Apply"
                              icon={<img src="/Filter-icon.svg" alt="icon" />}
                              onClick={() => {}}
                              activeState={false}
                              type="submit"
                            />
                          </Box>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Form>
                );
              }}
            </Formik>
          </Stack>
          <Box>
            <CustomAccordian
              summary="PAYINS"
              details={
                <Table
                  columns={columns}
                  rows={rowData}
                  name="payinsReports"
                  loading={loading}
                  currentPage={0}
                  totalPages={1}
                />
              }
            />
          </Box>
          <Box>
            <CustomAccordian
              summary="PAYOUTS"
              details={
                <Table
                  columns={columns}
                  rows={rowData}
                  name="payoutsReports"
                  loading={loading}
                  currentPage={0}
                  totalPages={1}
                />
              }
            />
          </Box>
        </Stack>
      </PageViewBox>
    </Box>
  );
};

export default Reports;

Reports.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps = ProtectedRoute(async (context) => {
  return {
    props: {},
  };
});
