import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
//Redux
import { connect } from "react-redux";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const styles = (theme) => ({
    ...theme.spreadThis,
    commentImage: {
        width: 100,
        height: 100,
        objectFit: "cover",
        borderRadius: "50%",
    },
    commentData: {
        marginLeft: 20,
    },
});

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = { comments: [] };
    }
    /**
     * !VERY IMPORTANT: There's an error when liking in TweetDialog, but saving comments to state fixed the issue.
     */
    componentDidMount() {
        this.setState({
            comments: this.props.comments,
        });
    }
    render() {
        const { classes } = this.props;
        const { comments } = this.state;
        return (
            <Grid container>
                {comments.map((comment, index) => {
                    const { userHandle, userImage, body, createdAt } = comment;
                    return (
                        <Fragment key={createdAt}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={2}>
                                        <img
                                            src={userImage}
                                            alt="comment"
                                            className={classes.commentImage}
                                        />
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>
                                            <Typography
                                                variant="h5"
                                                component={Link}
                                                to={`/users/${userHandle}`}
                                                color="primary"
                                            >
                                                {userHandle}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                            >
                                                {dayjs(createdAt).format(
                                                    "h:mm a, MMM DD YYYY"
                                                )}
                                            </Typography>
                                            <hr
                                                className={
                                                    classes.invisibleSeparator
                                                }
                                            />
                                            <Typography variant="body1">
                                                {body}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {index !== comments.length - 1 && (
                                <hr className={classes.visibleSeparator} />
                            )}
                        </Fragment>
                    );
                })}
            </Grid>
        );
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired,
};

export default connect()(withStyles(styles)(Comments));
