import React, { useState, useEffect } from "react";
import { withStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import appIcon from "../images/logo192.png";
import Typography from "@mui/material/Typography";
import "./css/login.scss";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.signInLogIn,
});

function Signup(props) {
  const {
    classes,
    UI: { loading, errors },
  } = props;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [handle, setHandle] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUserData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      handle: handle,
    };

    props.signupUser(newUserData, navigate);
  };
  const handleChange = (event) => {
    switch (event.target.name) {
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "confirmPassword":
        setConfirmPassword(event.target.value);
        break;
      case "handle":
        setHandle(event.target.value);
        break;
    }
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm></Grid>
      <Grid item sm>
        <img src={appIcon} className={classes.image}></img>
        <Typography variant="h4" className={classes.pageTitle}>
          Signup
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={email}
            onChange={handleChange}
            fullWidth
            variant="standard"
            helperText={errors.email}
            error={errors.email ? true : false}
          ></TextField>
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={password}
            onChange={handleChange}
            fullWidth
            variant="standard"
            helperText={errors.password}
            error={errors.password ? true : false}
          ></TextField>
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm password"
            className={classes.textField}
            value={confirmPassword}
            onChange={handleChange}
            fullWidth
            variant="standard"
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
          ></TextField>
          <TextField
            id="handle"
            name="handle"
            type="text"
            label="Handle"
            className={classes.textField}
            value={handle}
            onChange={handleChange}
            fullWidth
            variant="standard"
            helperText={errors.handle}
            error={errors.handle ? true : false}
          ></TextField>
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            className={classes.button}
          >
            Signup
          </LoadingButton>
          <br />
          <small>
            Already have an account? Login <Link to="/login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm></Grid>
    </Grid>
  );
}
Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  signupUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Signup));
