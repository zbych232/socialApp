import React from "react";
import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";

const LikeButton = (props) => {
  const {
    user: { authenticated },
  } = props;

  const likedScream = () => {
    if (
      props.user.likes &&
      props.user.likes.find((like) => like.screamId === props.screamId)
    )
      return true;
    else return false;
  };
  const likeScream = () => {
    props.likeScream(props.screamId);
  };
  const unlikeScream = () => {
    props.unlikeScream(props.screamId);
  };

  const likeButton = !authenticated ? (
    <Link to="/login">
      <MyButton tip="Like">
        <FavoriteBorderIcon color="primary"></FavoriteBorderIcon>
      </MyButton>
    </Link>
  ) : likedScream() ? (
    <MyButton tip="Undo like" onClick={unlikeScream}>
      <FavoriteIcon color="primary"></FavoriteIcon>
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={likeScream}>
      <FavoriteBorderIcon color="primary"></FavoriteBorderIcon>
    </MyButton>
  );
  return likeButton;
};

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeScream,
  unlikeScream,
};
export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
