import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AuthRoute = ({ authenticated }) => {
  return authenticated ? <Navigate to="/" /> : <Outlet />;
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  user: state.user,
});
AuthRoute.propTypes = {
  user: PropTypes.object,
};
export default connect(mapStateToProps)(AuthRoute);
