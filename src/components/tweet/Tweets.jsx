import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TweetFeatures from "./TweetFeatures";
import TweetDialog from "./TweetDialog";

//Redux
import { connect } from "react-redux";
import {
    likeTweet,
    unlikeTweet,
    deleteTweet,
} from "../../redux/actions/dataActions";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

//dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const styles = (theme) => ({
    ...theme.spreadThis,
    // card: {
    //     position: "relative",
    //     display: "flex",
    //     marginBottom: 20,
    // },
    // content: {
    //     width: "100%",
    // },
    body: {
        marginTop: 10,
    },
    deleteButton: {
        position: "absolute",
        left: "91%",
    },
});

class Tweet extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        dayjs.extend(relativeTime);

        //basically const classes = this.props.classes
        const {
            classes,
            tweet: {
                tweetId,
                body,
                userHandle,
                createdAt,
                commentCount,
                likeCount,
                userImage,
            },
            user: {
                authenticated,
                likes,
                credentials: { handle },
            },
            openDialog
        } = this.props;

        return (
            <div>
                <Card className={classes.card}>
                    <CardMedia
                        image={userImage}
                        className={classes.postImage}
                        title="Profile image"
                    />
                    <CardContent className={classes.content}>
                        <Typography
                            variant="h5"
                            component={Link}
                            to={`/users/${userHandle}`}
                            color="primary"
                        >
                            {userHandle}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).fromNow()}
                        </Typography>
                        <Typography className={classes.body} variant="body1">
                            {body}
                        </Typography>
                        <TweetFeatures
                            tweetId={tweetId}
                            handle={handle}
                            userHandle={userHandle}
                            authenticated={authenticated}
                            likeCount={likeCount}
                            commentCount={commentCount}
                            likes={likes}
                            likeTweet={this.props.likeTweet}
                            unlikeTweet={this.props.unlikeTweet}
                            /**!Delete and maybe separate into new component */
                            deleteTweet={this.props.deleteTweet}
                            deleteButton={classes.deleteButton}
                        />
                        {/**If openDialog doesn't exist, it'll pass undefined value so it won't open. Opens if exists, for notifications */}
                        <TweetDialog tweetId={tweetId} userHandle={userHandle} openDialog={openDialog}>
                            <TweetFeatures
                                tweetId={tweetId}
                                handle={handle}
                                userHandle={userHandle}
                                authenticated={authenticated}
                                likeCount={likeCount}
                                commentCount={commentCount}
                                likes={likes}
                                likeTweet={this.props.likeTweet}
                                unlikeTweet={this.props.unlikeTweet}
                                /**!Delete and maybe separate into new component */
                                deleteTweet={this.props.deleteTweet}
                                deleteButton={classes.deleteButton}
                            />
                        </TweetDialog>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

Tweet.propTypes = {
    user: PropTypes.object.isRequired,
    likeTweet: PropTypes.func.isRequired,
    unlikeTweet: PropTypes.func.isRequired,
    deleteTweet: PropTypes.func.isRequired,
    tweet: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    //Not required since most won't have this property
    openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapActionsToProps = {
    likeTweet,
    unlikeTweet,
    deleteTweet,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Tweet));
