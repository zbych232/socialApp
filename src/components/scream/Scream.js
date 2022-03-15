import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "../css/scream.scss";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { connect } from "react-redux";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import ChatIcon from "@mui/icons-material/Chat";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";

const styles = (theme) => ({
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    maxWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
  userTitle: {},
});

const Scream = (props) => {
  dayjs.extend(relativeTime);
  const {
    scream: {
      body,
      createdAt,
      userImage,
      userHandle,
      screamId,
      likeCount,
      commentCount,
    },
    user: {
      authenticated,
      credentials: { handle },
    },
    openDialog,
  } = props;
  const { classes } = props;

  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId}></DeleteScream>
    ) : null;

  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile image"
        className={classes.image}
        component="img"
      ></CardMedia>
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          className={classes.userTitle}
          color="primary"
        >
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="text.secondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId}></LikeButton>
        <span>{likeCount} Likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary"></ChatIcon>
        </MyButton>
        <span>{commentCount} comments</span>
        <ScreamDialog
          screamId={screamId}
          userHandle={userHandle}
          openDialog={openDialog}
        ></ScreamDialog>
      </CardContent>
    </Card>
  );
};

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {})(withStyles(styles)(Scream));
