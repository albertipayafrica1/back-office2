import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { fetchUsers } from "../../../redux";

function UsersContainer({ userData, fetchUsers1 }) {
  useEffect(() => {
    fetchUsers1();
  }, []);
  return userData.loading ? (
    <h2>Loading</h2>
  ) : userData.error ? (
    <h2>{userData.error}</h2>
  ) : (
    <div>
      <h2>Users List</h2>
      <div>
        {userData &&
          userData.users &&
          userData.users.map((user) => <p>{user.name}</p>)}
      </div>
    </div>
  );
}

UsersContainer.propTypes = {
  userData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    users: PropTypes.arrayOf({ name: PropTypes.string }).isRequired,
  }).isRequired,
  fetchUsers1: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers1: () => dispatch(fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
