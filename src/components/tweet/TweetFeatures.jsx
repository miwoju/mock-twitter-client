import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

//MUI
import CustomButton from "./CustomButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

//Icons
import ChatIcon from "@material-ui/icons/Chat";
import LikeIcon from "@material-ui/icons/Favorite";
import EmptyLikeIcon from "@material-ui/icons/FavoriteBorder";
import DeleteIcon from "@material-ui/icons/DeleteOutline";

class TweetFeatures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.likeTweet = this.likeTweet.bind(this);
        this.unlikeTweet = this.unlikeTweet.bind(this);
        this.deleteTweet = this.deleteTweet.bind(this);
    }
    likedTweet() {
        const { likes, tweetId } = this.props;
        if (
            //If the user has any likes. If he does, search through his likes with find()
            likes &&
            likes.find((like) => like.tweetId === tweetId)
        ) {
            return true;
        } else {
            return false;
        }
    }
    likeTweet() {
        this.props.likeTweet(this.props.tweetId);
    }
    unlikeTweet() {
        this.props.unlikeTweet(this.props.tweetId);
    }
    deleteTweet() {
        this.props.deleteTweet(this.props.tweetId);
        this.handleClose();
    }
    handleOpen() {
        this.setState({
            open: true,
        });
    }
    handleClose() {
        this.setState({
            open: false,
        });
    }
    render() {
        const {
            handle,
            userHandle,
            authenticated,
            likeCount,
            commentCount,
            deleteButton,
        } = this.props;

        const { open } = this.state;
        return (
            <Fragment>
                {!authenticated ? (
                    <Link to="/login">
                        <CustomButton>
                            <EmptyLikeIcon color="primary" />
                        </CustomButton>
                    </Link>
                ) : this.likedTweet() ? (
                    <CustomButton toolTipTitle="Unlike" btnOnClick={this.unlikeTweet}>
                        <LikeIcon color="primary" />
                    </CustomButton>
                ) : (
                    <CustomButton toolTipTitle="Like" btnOnClick={this.likeTweet}>
                        <EmptyLikeIcon color="primary" />
                    </CustomButton>
                )}
                <span>{likeCount === 0 ? null : likeCount}</span>
                <CustomButton toolTipTitle="Comment">
                    <ChatIcon color="primary" />
                </CustomButton>
                <span>{commentCount} comments</span>
                {authenticated && userHandle === handle ? (
                    <CustomButton toolTipTitle="Delete" btnOnClick={this.handleOpen} btnClassName={deleteButton}>
                        <DeleteIcon color="secondary" />
                    </CustomButton>
                ) : null}
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>
                        Are you sure you want to delete this tweet?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.deleteTweet}>Delete</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

export default TweetFeatures;
