import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import { connect } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Close from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import MyButton from "../../util/MyButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { getScream } from "../../redux/actions/dataActions";
import UnfoldMore from "@mui/icons-material/UnfoldMore";
import LikeButton from "./LikeButton";
import ChatIcon from "@mui/icons-material/Chat";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import store from "../../redux/store";
import { CLEAR_ERRORS } from "../../redux/types";

const styles = (theme) => ({
  ...theme.global,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "5%",
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
});
function ScreamDialog(props) {
  const [open, setOpen] = useState(false);
  const [oldPath, setOldPath] = useState("");
  const [newPath, setNewPath] = useState("");

  const { openDialog } = props;

  useEffect(() => {
    if (openDialog) {
      handleOpen();
    }
  }, []);

  const {
    classes,
    scream: {
      screamId,
      body,
      createdAt,
      likeCount,
      commentCount,
      userImage,
      userHandle,
      comments,
    },
    UI: { loading },
  } = props;

  const handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, screamId } = props;
    const newPath = `/users/${userHandle}/scream/${screamId}`;

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    window.history.pushState(null, null, newPath);

    setOpen(true);
    setOldPath(oldPath);
    setNewPath(newPath);
    props.getScream(props.screamId);
  };
  const handleClose = () => {
    window.history.pushState(null, null, oldPath);
    setOpen(false);
    store.dispatch({
      type: CLEAR_ERRORS,
    });
  };

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2}></CircularProgress>
    </div>
  ) : (
    <Grid container>
      <Grid item sm={5}>
        <img
          src={userImage}
          alt="Profile"
          className={classes.profileImage}
        ></img>
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator}></hr>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format("h:mm a, MMMMM DD YYYY")}
        </Typography>
        <hr className={classes.invisibleSeparator}></hr>
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary"></ChatIcon>
        </MyButton>
        <span>{commentCount} comments</span>
      </Grid>
      <hr className={classes.visibleSeparator}></hr>
      <CommentForm screamId={screamId} />
      <Comments comments={comments} />
    </Grid>
  );

  return (
    <Fragment>
      <MyButton
        onClick={handleOpen}
        tip="Expand scream"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary"></UnfoldMore>
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <Close></Close>
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  UI: state.UI,
});

const mapActionsToProps = {
  getScream,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
