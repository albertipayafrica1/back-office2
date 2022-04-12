import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import ProtectedRoute from "../../../components/ProtectedRoute";
import { fetchUsers } from "../../../redux";

import { wrapper } from "../../../redux/store";

const Kyc = ({ user }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchUsers());
  }, []);
  const users = useSelector((state) => state.user.users);
  console.log(users, "users");

  return (
    <div>
      {/* <button onClick={() => dispatch(fetchUsers())}>fetchusers</button> */}
      {user.users[0] !== undefined && user.users[0].name}
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
    // console.log(store, "store");
    await store.dispatch(fetchUsers());
    const { user } = await store.getState();

    return {
      props: { user },
    };
  }
);
