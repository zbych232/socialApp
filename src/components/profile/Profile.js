import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { connect } from "react-redux";
import Paper from "@mui/material/Paper";
import MuiLink from "@mui/material/Link";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import LocationOn from "@mui/icons-material/LocationOn";
import InsertLink from "@mui/icons-material/InsertLink";
import CalendarToday from "@mui/icons-material/CalendarToday";
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardReturn from "@mui/icons-material/KeyboardReturn";
import Tooltip from "@mui/material/Tooltip";
import { logoutUser, uploadImage } from "../../redux/actions/userActions";
import Dialog from "@mui/material/Dialog";
import EditDetails from "./EditDetails";
import MyButton from "../../util/MyButton";
import ProfileSkeleton from "../../util/ProfileSkeleton";

const styles = (theme) => ({
  ...theme.profile,
});

function Profile(props) {
  const {
    classes,
    user: {
      credentials: { handle, createdAt, imageUrl, bio, website, location },
      loading,
      authenticated,
    },
  } = props;

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    console.log("file: ", image);
    const formData = new FormData();
    formData.append("image", image, image.name);
    props.uploadImage(formData);
  };
  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  const handleLogout = () => {
    props.logoutUser();
  };

  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image"></img>
            <input
              type="file"
              id="imageInput"
              onChange={handleImageChange}
              hidden="hidden"
            ></input>
            <MyButton tip="Edit profile picture" onClick={handleEditPicture}>
              <EditIcon color="primary"></EditIcon>
            </MyButton>
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

          <MyButton tip="Logout" onClick={handleLogout}>
            <KeyboardReturn color="primary"></KeyboardReturn>
          </MyButton>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <div>
            <Button
              component={Link}
              to="/login"
              color="primary"
              variant="contained"
            >
              Login
            </Button>
          </div>
          <div>
            <Button
              color="secondary"
              component={Link}
              to="/signup"
              variant="contained"
            >
              Signup
            </Button>
          </div>
        </div>
      </Paper>
    )
  ) : (
    <ProfileSkeleton />
  );
  return profileMarkup;
}
Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  logoutUser,
  uploadImage,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
