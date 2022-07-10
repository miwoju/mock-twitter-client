import {
    SET_TWEET,
    SET_TWEETS,
    LOADING_DATA,
    LIKE_TWEET,
    UNLIKE_TWEET,
    DELETE_TWEET,
    POST_TWEET,
    POST_COMMENT,
} from "../types";

const initialState = {
    tweets: [],
    tweet: {},
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return { ...state, loading: true };
        case SET_TWEETS:
            return { ...state, tweets: action.payload, loading: false };
        case SET_TWEET:
            return { ...state, tweet: action.payload, loading: false };
        //This chains both cases
        case LIKE_TWEET:
        case UNLIKE_TWEET:
            let likeIndex = state.tweets.findIndex(
                (tweet) => tweet.tweetId === action.payload.tweetId
            );
            state.tweets[likeIndex] = action.payload;
            return { ...state, tweet: action.payload };
        case DELETE_TWEET:
            // console.log(...state);
            let deleteIndex = state.tweets.findIndex(
                (tweet) => tweet.tweetId === action.payload
            );
            state.tweets.splice(deleteIndex, 1);
            // console.log("after",...state);
            return {
                ...state,
            };
        case POST_TWEET:
            // state.tweets.unshift(action.payload.resTweet); was mine
            return {
                ...state,
                tweets: [action.payload, ...state.tweets],
            };
        case POST_COMMENT:
            return {
                ...state,
                tweet: { ...state.tweet, comments: [action.payload, ...state.tweet.comments] },
            };
        default:
            return state;
    }
}
