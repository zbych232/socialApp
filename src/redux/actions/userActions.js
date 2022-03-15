import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
} from "../types";
import axios from "axios";

export const loginUser = (userData, navigate) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const response = await axios.post("/login", userData);

    setAuthotizationHeader(response.data.token);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    navigate("/");
  } catch (err) {
    console.log(err);
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const signupUser = (newUserData, navigate) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const response = await axios.post("/signup", newUserData);
    setAuthotizationHeader(response.data.token);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    navigate("/");
  } catch (err) {
    console.log(err);
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user/image", formData)
    .then((res) => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const editUserDetails = (userData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user", userData)
    .then((res) => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

const setAuthotizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};

export const markNotificationsRead = (notificationIds) => (dispatch) => {
  axios
    .post("/notifications", notificationIds)
    .then((res) => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ,
      });
    })
    .catch((err) => console.log(err));
};
