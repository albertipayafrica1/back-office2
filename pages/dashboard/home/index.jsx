import { Typography, Stack, Box } from "@mui/material";
import PageViewBox from "../../../atoms/PageViewBox";

import TransactionSummaryCard from "../../../atoms/TransactionSummaryCard";

import DashboardLayout from "../../../components/Layouts/Dashboard";
import ProtectedRoute from "../../../components/ProtectedRoute";

const Home = () => {
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
          sx={{ p: 8 }}
        >
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
              body="KES 0"
              variant="pastelPink"
            />
            <TransactionSummaryCard
              title="Average Payin"
              body="KES 0"
              variant="pastelBlue"
            />
            <TransactionSummaryCard
              title="Successful Transactions"
              body="0"
              variant="pastelOrange"
            />
          </Stack>
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
