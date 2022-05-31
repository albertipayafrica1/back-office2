import React, { useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import ProtectedRoute from "../../../components/ProtectedRoute";
import { fetchUsers, fetchUserSuccess } from "../../../redux";

import { wrapper } from "../../../redux/store";

const Kyc = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // useEffect(() => {
  //   router.push("/dashboard/transactions");
  // }, []);
  // const user = useSelector((state) => state.user);

  return (
    <div>
      <button
        onClick={() => {
          dispatch(fetchUserSuccess([{ name: "hello" }]));
          router.push("/dashboard/kyc");
        }}
        type="button"
      >
        fetchusers
      </button>
      {/* {user !== undefined && user.users[0] !== undefined && user.users[0].name} */}
      {/* users[0].name */}
    </div>
  );
};

Kyc.propTypes = {
  user: PropTypes.shape({ users: PropTypes.arrayOf({}) }).isRequired,
};

export default Kyc;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { req } = context;
    // await store.dispatch(fetchUsers());
    // const { user } = await store.getState();

    return {
      props: { user: "" },
    };
  }
);
