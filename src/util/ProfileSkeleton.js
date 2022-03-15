import React, { Fragment } from "react";
import NoImg from "../images/user_avatar.png";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import LocationOn from "@mui/icons-material/LocationOn";
import CalendarToday from "@mui/icons-material/CalendarToday";
import LinkIcon from "@mui/icons-material/Link";
import Paper from "@mui/material/Paper";

const styles = (theme) => ({
  ...theme.profile,

  handle: {
    height: 20,
    backgroundColor: theme.palette.primary.main,
    width: 60,
    margin: "0 auto 7px auto",
  },

  fullLine: {
    height: 15,
    width: "100%",
    marginBottom: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  halfLine: {
    height: 15,
    width: "50%",
    marginBottom: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
});

const ProfileSkeleton = (props) => {
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={NoImg} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <div className={classes.handle} />
          <hr />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <hr />
          <LocationOn color="primary" /> <span>Location</span>
          <hr />
          <LinkIcon color="primary" /> https://website.com
          <hr />
          <CalendarToday color="primary" /> Joined date
        </div>
      </div>
    </Paper>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSkeleton);
