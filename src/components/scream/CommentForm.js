import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";
import LoadingButton from "@mui/lab/LoadingButton";

const styles = (theme) => ({
  ...theme.global,
  ...theme.signInLogIn,
});

function CommentForm(props) {
  const {
    classes,
    authenticated,
    UI: { errors, loading },
  } = props;

  const [body, setBody] = useState("");

  const handleChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.submitComment(props.screamId, { body: body }, clearForm);
  };

  const clearForm = () => {
    setBody("");
  };

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          error={errors.comment ? true : false}
          helperText={errors.comment}
          value={body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
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
      <hr className={classes.visibleSeparator}></hr>
    </Grid>
  ) : null;

  return commentFormMarkup;
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentForm)
);
