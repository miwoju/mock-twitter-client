import React from "react";
import PropTypes from "prop-types";
import noImage from "../images/no-image.png";

//MUI
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";

//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = (theme) => ({
    ...theme.spreadThis,
    handle: {
        height: 20,
        backgroundColor: theme.palette.primary.main,
        width: 80,
        margin: "0 auto 7 auto",
    },
    fullLine: {
        height: 15,
        backgroundColor: "rgba(0,0,0,0.6)",
        width: "100%",
        marginBottom: 10,
    },
    halfLine: {
        height: 15,
        backgroundColor: "rgba(0,0,0,0.6)",
        width: "50%",
        margin: "0 auto 10 auto",
    }
});

const ProfileSkeleton = (props) => {
    const { classes } = props;

    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img
                        className="profile-image"
                        src={noImage}
                        alt="profile"
                    />
                </div>
                <hr />
                <div className="profile-details">
                    <div className={classes.handle} />
                    <hr />
                    <div className={classes.fullLine} />
                    <div className={classes.halfLine} />
                    <hr />
                    <LocationOn color="primary" /> <span>Location</span>
                    <hr />
                    <LinkIcon color="primary" /> <span>Website</span>
                    <hr />
                    <CalendarToday color="primary" /> <span>Joined</span>
                </div>
            </div>
        </Paper>
    );
};

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSkeleton);
