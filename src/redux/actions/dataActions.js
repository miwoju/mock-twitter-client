import {
    SET_TWEET,
    SET_TWEETS,
    LOADING_DATA,
    LIKE_TWEET,
    UNLIKE_TWEET,
    DELETE_TWEET,
    POST_TWEET,
    LOADING_UI,
    SET_ERRORS,
    CLEAR_ERRORS,
    STOP_LOADING_UI,
    POST_COMMENT,
} from "../types";
import axios from "axios";

//Get all tweets
export const getTweets = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
        .get("/tweets")
        .then((res) => {
            dispatch({ type: SET_TWEETS, payload: res.data });
        })
        .catch((err) => {
            //if error, reset to empty object
            dispatch({ type: SET_TWEETS, payload: [] });
        });
};

//
export const getTweet = (tweetId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .get(`/tweet/${tweetId}`)
        .then((res) => {
            dispatch({ type: SET_TWEET, payload: res.data });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch((err) => {
            console.log(err);
        });
};

//Post a tweet
export const postTweet = (newTweet) => (dispatch) => {
    //Initializing with dispatch CLEAR_ERRORS fixes issue that doesn't clear error
    dispatch({ type: CLEAR_ERRORS });
    dispatch({ type: LOADING_UI });
    axios
        .post("/tweet", newTweet)
        .then((res) => {
            dispatch({
                type: POST_TWEET,
                payload: res.data,
            });
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
        });
};

//Like a tweet
export const likeTweet = (tweetId) => (dispatch) => {
    axios
        .get(`/tweet/${tweetId}/like`)
        .then((res) => {
            dispatch({ type: LIKE_TWEET, payload: res.data });
        })
        .catch((err) => {
            console.log(err);
        });
};

//Unlike a tweet
export const unlikeTweet = (tweetId) => (dispatch) => {
    axios
        .get(`/tweet/${tweetId}/unlike`)
        .then((res) => {
            dispatch({ type: UNLIKE_TWEET, payload: res.data });
        })
        .catch((err) => {
            console.log(err);
        });
};

//Delete a tweet
export const deleteTweet = (tweetId) => (dispatch) => {
    axios
        .delete(`/tweet/${tweetId}`)
        .then(() => {
            dispatch({ type: DELETE_TWEET, payload: tweetId });
        })
        .catch((err) => {
            console.log(err);
        });
};

//Post comment
export const postComment = (tweetId, newComment) => (dispatch) => {
    axios
        .post(`/tweet/${tweetId}/comment`, newComment)
        .then((res) => {
            dispatch({ type: POST_COMMENT, payload: res.data });
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
        });
};

export const getUserData = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
        .get(`/user/${userHandle}`)
        .then((res) => {
            dispatch({ type: SET_TWEETS, payload: res.data.tweets });
        })
        .catch(() => {
            dispatch({ type: SET_TWEETS, payload: null });
        });
};

//!mock-twitter tells us this, but I fixed by dispatching CLEAR_ERRORS at start of postTweet
// export const clearErrors = () => (dispatch) => {
//     dispatch({type: CLEAR_ERRORS})
// };
