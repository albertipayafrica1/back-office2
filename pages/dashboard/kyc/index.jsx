import React, { useState } from "react";
import HorizontalLinearStepper from "../../../components/Stepper";
import ProtectedRoute from "../../../components/ProtectedRoute";

import { wrapper } from "../../../redux/store";

const Kyc = () => {
  return (
    <div>
      <HorizontalLinearStepper
        flow="registered"
        companyType="wedding"
        duration="longTerm"
      />
    </div>
  );
};

export default Kyc;

export const getServerSideProps = ProtectedRoute(
  wrapper.getServerSideProps((store) => async (context) => {
    const { req } = context;

    return {
      props: {},
    };
  })
);
