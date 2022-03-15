import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Scream from "../components/scream/Scream";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";
import StaticProfile from "../components/profile/StaticProfile";
import { useParams } from "react-router-dom";
import ScreamSkeleton from "../util/ScreamSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

function User(props) {
  const [profile, setProfile] = useState(null);
  const { handle } = useParams();
  const { screamId } = useParams();

  useEffect(() => {
    props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => console.log(err));
  }, []);

  const {
    data: { screams, loading },
  } = props;

  const screamsMarkup = loading ? (
    <ScreamSkeleton />
  ) : screams === null ? (
    <p>No screams from this user</p>
  ) : !screamId ? (
    screams.map((scream, index) => <Scream key={index} scream={scream} />)
  ) : (
    screams.map((scream, index) => {
      if (scream.screamId !== screamId)
        return <Scream key={index} scream={scream} />;
      else return <Scream key={index} scream={scream} openDialog />;
    })
  );

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {screamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile === null ? (
          <ProfileSkeleton />
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
    </Grid>
  );
}

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(User);
