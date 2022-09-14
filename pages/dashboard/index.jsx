import React from "react";
import CreateAccountOtpDialog from "../../components/Auth/CreateAccountOtpDialog";

import ProtectedRoute from "../../components/ProtectedRoute";

const index = () => {
  const paperPropsStyling = {
    position: "absolute",
    m: 0,
    top: 10,
    left: 50,
  };
  return (
    <div>
      <CreateAccountOtpDialog
        open
        backDropVisible
        paperPropsStyling={paperPropsStyling}
      />
    </div>
  );
};

export default index;

export const getServerSideProps = ProtectedRoute(async (context) => {
  return {
    redirect: {
      permanent: false,
      destination: `/dashboard/home`,
    },
  };
});
