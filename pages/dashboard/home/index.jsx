import { useSelector } from "react-redux";
import { Typography, Stack, Box } from "@mui/material";

import PageViewBox from "../../../atoms/PageViewBox";
import TransactionSummaryCard from "../../../atoms/TransactionSummaryCard";
import DoughnutChart from "../../../atoms/DoughnutChart";

import DashboardLayout from "../../../components/Layouts/Dashboard";
import ProtectedRoute from "../../../components/ProtectedRoute";
import AreaChart from "../../../atoms/AreaChart";

const Home = () => {
  const globalCurrency = useSelector((state) => state.currency.globalCurrency);

  return (
    <Box sx={{ p: 10 }}>
      <Typography variant="title3" sx={{ ml: 4, mb: 4 }}>
        Welcome to your transactions overview
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ ml: 4, mb: 4, color: (theme) => theme.colors.mono12 }}
        >
          {new Date().toLocaleDateString("en-us", { weekday: "long" })},
          {new Date().toString().substring(3, 15)}
        </Typography>
      </Box>
      <PageViewBox>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={4}
          sx={{ p: 8 }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={4}
            sx={{ width: "100%", height: "100%" }}
          >
            <Typography variant="subtitle6">Payins Summary</Typography>
            <Typography variant="subtitle6">Today</Typography>
          </Stack>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="center"
            alignItems="center"
            spacing={4}
            sx={{ width: "100%", height: "100%" }}
          >
            <TransactionSummaryCard
              title="Total Transactions"
              body="0"
              variant="pastelGreen"
            />
            <TransactionSummaryCard
              title="Total Amount"
              body={`${globalCurrency} 0`}
              variant="pastelPink"
            />
            <TransactionSummaryCard
              title="Average Payin"
              body={`${globalCurrency} 0`}
              variant="pastelBlue"
            />
            <TransactionSummaryCard
              title="Successful Transactions"
              body="0"
              variant="pastelOrange"
            />
          </Stack>
        </Stack>
        <Stack sx={{ p: 8 }} spacing={4}>
          <Typography variant="subtitle6">Weekly Transactions Trend</Typography>
          <PageViewBox>
            <Stack
              sx={{ pt: 8, pb: 8 }}
              justifyContent="center"
              alignItems="center"
            >
              <AreaChart />
            </Stack>
          </PageViewBox>
        </Stack>
        <Stack sx={{ p: 8 }} spacing={4}>
          <Typography variant="subtitle6">Channels Summary</Typography>
          <PageViewBox>
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{ pt: 15, pb: 8 }}
            >
              <DoughnutChart />
            </Stack>
          </PageViewBox>
        </Stack>
      </PageViewBox>
    </Box>
  );
};

export default Home;

Home.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps = ProtectedRoute(async (context) => {
  return {
    props: {},
  };
});
