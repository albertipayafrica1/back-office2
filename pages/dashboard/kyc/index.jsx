import React from "react";
import HorizontalLinearStepper from "../../../components/Stepper";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { wrapper } from "../../../redux/store";

function stepper(props) {
  return (
    <div>
      <HorizontalLinearStepper />
    </div>
  );
}

export default stepper;

// export const getServerSideProps = ProtectedRoute(
//   wrapper.getServerSideProps((store) => async (context) => {
//     const { req } = context;
//     console.log(store, "store");

//     return {
//       props: {},
//     };
//   })
// );
