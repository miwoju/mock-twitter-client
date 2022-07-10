import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

//!For now, you cannot edit profile through the StaticProfile page, so imports are commented out.

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
// import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
// import EditIcon from "@material-ui/icons/Edit";

//Redux
// import { connect } from "react-redux";
// import { logoutUser, uploadImage } from "../../redux/actions/userActions";
// import EditDetails from "./EditDetails";
// import CustomButton from "../tweet/CustomButton";

const styles = (theme) => ({
    ...theme.spreadThis,
});

class StaticProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const {
            classes,
            profile: { handle, createdAt, imageUrl, bio, website, location },
        } = this.props;
        return (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img
                            className="profile-image"
                            src={imageUrl}
                            alt="profile"
                        />
                        {/**onChange is triggered each time a user selects a file, so it skips having to manually click upload button*/}
                        {/* <input
                            type="file"
                            id="imageUpload"
                            onChange={this.handleImageUpload}
                            hidden="hidden"
                        />
                        <CustomButton
                            toolTipTitle="Change image"
                            toolTipPlacement="top"
                            btnOnClick={this.handleEditImage}
                            btnClassName="edit-button"
                        >
                            <EditIcon color="primary" />
                        </CustomButton> */}
                    </div>

                    <hr />
                    <div className="profile-details">
                        <MuiLink
                            component={Link}
                            to={`/users/${handle}`}
                            variant="h6"
                        >
                            @{handle}
                        </MuiLink>
                        <hr />
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr />
                        {location && (
                            <Fragment>
                                <LocationOn color="primary" />
                                <span>{location}</span>
                                <hr />
                            </Fragment>
                        )}
                        {website && (
                            <Fragment>
                                <LinkIcon color="primary" />
                                <a
                                    href={website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span> {website}</span>
                                </a>
                                <hr />
                            </Fragment>
                        )}
                        <CalendarToday color="primary" />{" "}
                        <span>
                            Joined {dayjs(createdAt).format("MMM YYYY")}
                        </span>
                    </div>
                    {/* <EditDetails />
                    <Typography
                        className={classes.logoutText}
                        variant="body2"
                        color="error"
                        onClick={this.handleLogout}
                    >
                        Sign out
                    </Typography> */}
                </div>
            </Paper>
        );
    }
}

StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StaticProfile);
