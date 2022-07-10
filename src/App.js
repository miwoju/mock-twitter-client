import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import jwtDecode from "jwt-decode";
import axios from "axios";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
//MUI
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
//Components
import Navbar from "./components/layout/Navbar";
//Util
import themeFile from "./util/theme.js";
import AuthRoute from "./util/AuthRoute";

// Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = "https://us-central1-socialape-e2614.cloudfunctions.net/api";

//!let authenticated;
const token = localStorage.FBIdToken;
if (token) {
    const decodedToken = jwtDecode(token);
    //Multiply by 1000 because it's in seconds
    if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser());
        window.location.href = "/login";
    } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common["Authorization"] = token;
        store.dispatch(getUserData());
    }
}

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                {/**Redux*/}
                <Provider store={store}>
                    <Router>
                        <Navbar />
                        <div className="container">
                            <Switch>
                                <Route exact path="/" component={home} />
                                <AuthRoute
                                    exact
                                    path="/login"
                                    component={login}
                                    //! authenticated={authenticated}
                                />
                                <AuthRoute
                                    exact
                                    path="/signup"
                                    component={signup}
                                    //! authenticated={authenticated}
                                />
                                <Route
                                    exact
                                    path="/users/:handle"
                                    component={user}
                                />
                                {/*For rerouting when clicked on notifications
                                 *Goes to user but with a trick.
                                 */}
                                <Route
                                    exact
                                    path="/users/:handle/tweet/:tweetId"
                                    component={user}
                                />
                            </Switch>
                        </div>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
