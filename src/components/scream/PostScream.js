import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import { postScream } from "../../redux/actions/dataActions";
import { connect } from "react-redux";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import MyButton from "../../util/MyButton";
import LoadingButton from "@mui/lab/LoadingButton";
import store from "../../redux/store";
import { CLEAR_ERRORS } from "../../redux/types";

const styles = (theme) => ({
  ...theme.signInLogIn,
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "5%",
  },
  submitButton: {
    float: "right",
    marginTop: 10,
  },
});
function PostScream(props) {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");

  const {
    classes,
    UI: { loading, errors },
  } = props;

  const callback = () => {
    setBody("");
    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setBody("");
    store.dispatch({ type: CLEAR_ERRORS });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.postScream({ body: body }, callback);
  };
  const handleChange = (event) => {
    switch (event.target.name) {
      case "body":
        setBody(event.target.value);
        break;
    }
  };
  return (
    <Fragment>
      <MyButton onClick={handleOpen} tip="Post a Scream!">
        <AddIcon></AddIcon>
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <Close></Close>
        </MyButton>
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="SCREAM!!!"
              multiline
              rows="3"
              placeholder="Scream at your fellow apes"
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
              variant="standard"
            ></TextField>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={loading}
              className={classes.submitButton}
            >
              Submit
            </LoadingButton>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});
export default connect(mapStateToProps, { postScream })(
  withStyles(styles)(PostScream)
);
