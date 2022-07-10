import {
    SET_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    LIKE_TWEET,
    UNLIKE_TWEET,
    MARK_NOTIFICATION_READ,
} from "../types";

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                //spreads the state so values can be changed
                ...state,
                authenticated: true,
            };
        //for when logging out
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            //...action.payload automatically fills in initialState object
            return {
                authenticated: true,
                loading: false,
                ...action.payload,
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true,
            };
        case LIKE_TWEET:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        tweetId: action.payload.tweetId,
                    },
                ],
            };
        case UNLIKE_TWEET:
            return {
                ...state,
                likes: [
                    ...state.likes.filter(
                        (like) => like.tweetId !== action.payload.tweetId
                    ),
                ],
            };
        case MARK_NOTIFICATION_READ:
            state.notifications.forEach((notification) => {
                notification.read = true;
            });
            return {
                ...state,
            };
        default:
            return state;
    }
}
