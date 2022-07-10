import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Tweets from "../components/tweet/Tweets";
import StaticProfile from "../components/profile/StaticProfile";
import TweetSkeleton from "../util/TweetSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

//MUI
import Grid from "@material-ui/core/Grid";

//Redux
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

class user extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: null,
            tweetIdParam: null,
        };
    }
    componentDidMount() {
        //params from route `/user/:handle` in app.js
        const handle = this.props.match.params.handle;
        //!FOR NOTIFICATIONS:
        const tweetId = this.props.match.params.tweetId;
        //*If tweetId exists(notification click), set param to tweetId
        if (tweetId) this.setState({ tweetIdParam: tweetId });

        this.props.getUserData(handle);
        //No need for redux because it's a static user profile, no need for global. So local state instead
        axios
            .get(`/user/${handle}`)
            .then((res) => {
                this.setState({
                    profile: res.data.user,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    render() {
        const { tweets, loading } = this.props.data;
        const { profile, tweetIdParam } = this.state;

        const tweetsMarkup = loading ? (
            <TweetSkeleton />
        ) : tweets === null ? (
            <p>This user has no posted any tweets</p>
        ) : !tweetIdParam ? (
            tweets.map((tweet) => <Tweets key={tweet.tweetId} tweet={tweet} />)
        ) : (
            tweets.map((tweet) => {
                if (tweet.tweetId !== tweetIdParam) {
                    return <Tweets key={tweet.tweetId} tweet={tweet} />;
                } else {
                    //*openDialog makes this tweet open up for notifications
                    return (
                        <Tweets key={tweet.tweetId} tweet={tweet} openDialog />
                    );
                }
            })
        );
        return (
            <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                    {profile === null ? (
                        <ProfileSkeleton />
                    ) : (
                        <StaticProfile profile={profile} />
                    )}
                </Grid>
                <Grid item xs={12} sm={8} style={{ marginTop: 25 }}>
                    {tweetsMarkup}
                </Grid>
            </Grid>
        );
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    data: state.data,
});

const mapActionsToProps = {
    getUserData,
};

export default connect(mapStateToProps, mapActionsToProps)(user);
