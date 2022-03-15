import React, { Fragment, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Scream from "../scream/Scream";
import Profile from "../profile/Profile";
import { connect } from "react-redux";
import { withStyles } from "@mui/styles";
import { getScreams } from "../../redux/actions/dataActions";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import MuiLink from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import LocationOn from "@mui/icons-material/LocationOn";
import InsertLink from "@mui/icons-material/InsertLink";
import CalendarToday from "@mui/icons-material/CalendarToday";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  ...theme.profile,
});

function StaticProfile(props) {
  const {
    classes,
    profile: { handle, createdAt, imageUrl, bio, website, location },
  } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image"></img>
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink href={`/users/${handle}`} color="primary" variant="h5">
            @{handle}
          </MuiLink>
          <hr />
          {bio && <Typography variant="body2">{bio}</Typography>}
          <hr />
          {location && (
            <Fragment>
              <LocationOn color="primary" />
              <span>{location}</span>
              <hr />
            </Fragment>
          )}
          {website && (
            <Fragment>
              <InsertLink color="primary"></InsertLink>
              <a href={website} target="_blank" rel="noopener noreferrer">
                {" "}
                {website}
              </a>
              <hr />
            </Fragment>
          )}
          <CalendarToday color="primary" />{" "}
          <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
        </div>
      </div>
    </Paper>
  );
}

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StaticProfile);
