import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Tweets from "../components/tweet/Tweets";
import Profile from "../components/profile/Profile";
import PropTypes from "prop-types";
import TweetSkeleton from "../util/TweetSkeleton"

//Redux
import { connect } from "react-redux";
import { getTweets } from "../redux/actions/dataActions";

class home extends Component {
    componentDidMount() {
        this.props.getTweets();
    }
    render() {
        const { tweets, loading } = this.props.data;
        const recentTweetsMarkup = !loading ? (
            tweets.map((tweet) => <Tweets key={tweet.tweetId} tweet={tweet} />)
        ) : (
            <TweetSkeleton />
        );
        return (
            <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                    <Profile />
                </Grid>
                <Grid item xs={12} sm={8} style={{ marginTop: 25 }}>
                    {recentTweetsMarkup}
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    data: state.data,
});

const mapActionsToProps = {
    getTweets,
};

home.propTypes = {
    getTweets: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(home);
