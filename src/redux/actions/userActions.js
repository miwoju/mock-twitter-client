import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    LOADING_USER,
    SET_UNAUTHENTICATED,
    MARK_NOTIFICATION_READ,
} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post("/login", userData)
        .then((res) => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push("/");
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
        });
};

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post("/signup", newUserData)
        .then((res) => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push("/");
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
        });
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
                //A data we send to reducer, and then reducer does something with it
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
        .post("/user/image", formData)
        .then(() => {
            //reloads userdata by redownloading
            dispatch(getUserData());
        })
        .catch((err) => {
            console.log(err);
        });
};

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
        .post("/user", userDetails)
        .then(() => {
            dispatch(getUserData());
        })
        .catch((err) => {
            console.log(err);
        });
};

export const markNotificationRead = (notificationsIds) => (dispatch) => {
    axios
        .post("/notifications", notificationsIds)
        .then(dispatch({ type: MARK_NOTIFICATION_READ }))
        .catch((err) => console.log(err));
};

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem("FBIdToken", FBIdToken);
    //Automatically adds authorization header each time user requests a protected route
    //Basically each time request is sent through axios, it will have this authorization header even for unprotected routes
    axios.defaults.headers.common["Authorization"] = FBIdToken;
};
