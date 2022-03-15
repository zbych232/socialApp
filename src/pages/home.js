import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
import { connect } from "react-redux";
import { withStyles } from "@mui/styles";
import { getScreams } from "../redux/actions/dataActions";
import PropTypes from "prop-types";
import ScreamSkeleton from "../util/ScreamSkeleton";

const styles = (theme) => ({
  ...theme.signInLogIn,
});
function Home(props) {
  const { classes } = props;
  const { screams, loading } = props.data;

  useEffect(() => {
    props.getScreams();
  }, []);

  let recentScreamsMarkup = !loading ? (
    screams.map((scream, index) => <Scream scream={scream} key={index} />)
  ) : (
    <ScreamSkeleton />
  );

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {recentScreamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
}

Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = { getScreams };
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Home));
