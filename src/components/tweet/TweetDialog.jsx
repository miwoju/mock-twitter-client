import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Comments from "./Comments.jsx";
import CommentForm from "./CommentForm.jsx";

//dayjs
import dayjs from "dayjs";

//Redux
import { connect } from "react-redux";
import { getTweet } from "../../redux/actions/dataActions";

//MUI
import CustomButton from "./CustomButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";

//Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";

const styles = (theme) => ({
    ...theme.spreadThis,
    profileImage: {
        height: 200,
        width: 200,
        borderRadius: "50%",
        objectFit: "cover",
    },

    dialogContent: {
        padding: 20,
    },
    expandButton: {
        position: "absolute",
        left: "50%",
        transform: "translate(-50%)",
    },
    progressDiv: {
        textAlign: "center",
        margin: "50 auto 50 auto",
    },
});

class TweetDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            oldPath: '',
            newPath: '',
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    componentDidMount() {
        //*If openDialog exists, then open dialog for notifications
        if (this.props.openDialog) {
            this.handleOpen();
        }
    }
    handleOpen() {
        //To handle new url when opening tweet, what twitter does
        let oldPath = window.location.pathname;

        const { userHandle, tweetId } = this.props;
        const newPath = `/users/${userHandle}/tweet/${tweetId}`

        //If old path doesn't exist(like followed by a link outside of twitter), ex: looking at a person's tweet on their profile and you close it, should revert to profile path
        if(oldPath === newPath) oldPath = `/users/${userHandle}`

        window.history.pushState(null, null, newPath);

        this.setState({
            open: true,
            oldPath,
            newPath,
        });
        this.props.getTweet(this.props.tweetId);
        console.log(this.props.tweet);
    }
    handleClose() {
        //To handle reverting to oldPath
        window.history.pushState(null, null, this.state.oldPath)
        this.setState({
            open: false,
        });
    }
    render() {
        const { open } = this.state;
        const {
            classes,
            tweet: {
                tweetId,
                body,
                createdAt,
                userHandle,
                userImage,
                comments,
            },
            UI: { loading },
            //drilled props from Tweets.jsx
            children,
        } = this.props;

        const dialogMarkup = loading ? (
            <div className={classes.progressDiv}>
                <CircularProgress size={200} thickness={2} />
            </div>
        ) : (
            <Grid container>
                <Grid item sm={5}>
                    <img
                        src={userImage}
                        alt="Profile"
                        className={classes.profileImage}
                    />
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        color="primary"
                        variant="h5"
                        component={Link}
                        to={`/users/${userHandle}`}
                    >
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography color="textSecondary" variant="body2">
                        {dayjs(createdAt).format("h:mm a, MMM DD YYYY")}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">{body}</Typography>
                    {
                        //TweetFeatures is child
                        children
                    }
                </Grid>
                <hr className={classes.visibleSeparator} />
                <CommentForm tweetId={tweetId} />
                <Comments comments={comments} />
            </Grid>
        );
        return (
            <Fragment>
                <CustomButton
                    toolTipTitle="Expand tweet"
                    btnOnClick={this.handleOpen}
                    btnClassName={classes.expandButton}
                >
                    <UnfoldMore color="primary" />
                </CustomButton>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    maxWidth="sm"
                    fullWidth
                >
                    <CustomButton
                        toolTipTitle="Close"
                        btnOnClick={this.handleClose}
                        toolTipClassName={classes.closeButton}
                    >
                        <CloseIcon color="primary" />
                    </CustomButton>
                    {/* <DialogTitle></DialogTitle> */}
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

TweetDialog.propTypes = {
    getTweet: PropTypes.func.isRequired,
    tweetId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    tweet: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    tweet: state.data.tweet,
    UI: state.UI,
});

const mapActionsToProps = {
    getTweet,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(TweetDialog));
