import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Navbar from "./components/layout/Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import themeFile from "./util/theme";
import jwtDecode from "jwt-decode";
import AuthRoute from "./util/AuthRoute";
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
import User from "./pages/user";
import axios from "axios";

const theme = createTheme(themeFile);

axios.defaults.baseURL =
  "https://europe-west1-fir-508b2.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    // window.location.href = "/login";
    store.dispatch(logoutUser());
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar></Navbar>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route
                exact
                path="/users/:handle/scream/:screamId"
                element={<User />}
              ></Route>
              <Route exact path="/users/:handle" element={<User />} />
              <Route exact path="/" element={<AuthRoute />}>
                <Route exact path="/login" element={<Login />} />
              </Route>
              <Route exact path="/" element={<AuthRoute />}>
                <Route exact path="/signup" element={<Signup />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
