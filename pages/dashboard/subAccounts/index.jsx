import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Cookies from "js-cookie";
import axios from "axios";

import { useSelector } from "react-redux";

import { Box } from "@mui/material";

import DashboardLayout from "../../../components/Layouts/Dashboard";
import ProtectedRoute from "../../../components/ProtectedRoute";
import SubAccountsTable from "../../../components/SubAccounts/SubAccountsTable";

const SubAccounts = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const companyRef = useSelector((state) => state.user.user.companyRef);

  useEffect(() => {
    setLoading(true);
    // setData([]);
    const config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/subs/${companyRef}/all/`,
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
          const result = response.data.response.data.map((acc) => {
            return {
              subAccountId: acc.attributes.subAccountId,
              mode: acc.attributes.subAccountMode,
              email: acc.attributes.email,
              phoneNumber: acc.attributes.phoneNumber,
              reference: acc.attributes.reference,
              date: acc.attributes.createdAt,
              "edit/delete": "Edit/Delete",
            };
          });

          setData(result);
        } else {
          setError("Something Went Wrong");
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.response === undefined) {
          setError("Something Went Wrong");
        } else if (err.response.status === 401) {
          return {
            redirect: {
              permanent: false,
              destination: `/`,
            },
          };
        } else if (err.response) {
          if (err.response.data.response !== undefined) {
            setError(err.response.data.response);
          } else {
            setError("Something Went Wrong, Reload to Retry");
          }
        } else {
          setError("Something Went Wrong");
        }
        setLoading(false);
        return error;
      });
  });

  // if (error) {
  //   return <div>{error}</div>;
  // }

  return (
    <Box sx={{ p: 10 }}>
      <SubAccountsTable
        setData={setData}
        name="subAccounts"
        rows={data}
        loading={loading}
        currentPage={parseInt(router.query.page, 10)}
      />
    </Box>
  );
};

export default SubAccounts;

SubAccounts.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps = ProtectedRoute(async (context) => {
  return {
    props: {},
  };
});
