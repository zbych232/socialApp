import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import { editUserDetails } from "../../redux/actions/userActions";
import { connect } from "react-redux";
import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import MyButton from "../../util/MyButton";

const styles = (theme) => ({
  ...theme.signInLogIn,
  button: {
    marginTop: 0,
    float: "right",
  },
});

function EditDetails(props) {
  const { classes } = props;
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const { credentials } = props;
    mapUserDetailsToState(credentials);
  }, []);

  const handleOpen = () => {
    setOpen(true);
    mapUserDetailsToState(props.credentials);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const userDetails = {
      bio: bio,
      website: website,
      location: location,
    };
    props.editUserDetails(userDetails);
    handleClose();
  };

  const onChange = (event) => {
    switch (event.target.name) {
      case "bio":
        setBio(event.target.value);
        break;
      case "website":
        setWebsite(event.target.value);
        break;
      case "location":
        setLocation(event.target.value);
        break;
    }
  };

  const mapUserDetailsToState = (credentials) => {
    setBio(credentials.bio ? credentials.bio : "");
    setWebsite(credentials.website ? credentials.website : "");
    setLocation(credentials.location ? credentials.location : "");
  };

  return (
    <Fragment>
      <MyButton
        tip="Edit details"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="primary"></EditIcon>
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={bio}
              onChange={onChange}
              fullWidth
              rows="3"
              variant="standard"
            ></TextField>
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your personal/professional website"
              className={classes.textField}
              value={website}
              onChange={onChange}
              fullWidth
              variant="standard"
            ></TextField>
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={location}
              onChange={onChange}
              fullWidth
              variant="standard"
            ></TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
);
