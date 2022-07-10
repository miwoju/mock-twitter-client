import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import ProfileSkeleton from "../../util/ProfileSkeleton";


//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";

//Redux
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../../redux/actions/userActions";
import EditDetails from "./EditDetails";
import CustomButton from "../tweet/CustomButton";

const styles = (theme) => ({
    ...theme.spreadThis,
});

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.handleEditImage = this.handleEditImage.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //not working...
    handleImageUpload(event) {
        const image = event.target.files[0];
        const formData = new FormData();
        //Takes name, value AKA image blob, and a filename
        formData.append("image", image, image.name);
        this.props.uploadImage(formData);
    }

    handleEditImage() {
        //Targets the input element for image file input
        const fileInput = document.getElementById("imageUpload");
        //Clicks the input element
        fileInput.click();
    }

    handleLogout() {
        this.props.logoutUser();
    }
    render() {
        const {
            classes,
            user: {
                credentials: {
                    handle,
                    createdAt,
                    imageUrl,
                    bio,
                    website,
                    location,
                },
                loading,
                authenticated,
            },
        } = this.props;

        let profileMarkup = !loading ? (
            authenticated ? (
                <Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <div className="image-wrapper">
                            <img
                                className="profile-image"
                                src={imageUrl}
                                alt="profile"
                            />
                            {/**onChange is triggered each time a user selects a file, so it skips having to manually click upload button*/}
                            <input
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
                            </CustomButton>
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
                            {bio && (
                                <Typography variant="body2">{bio}</Typography>
                            )}
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
                        <EditDetails />
                        <Typography
                            className={classes.logoutText}
                            variant="body2"
                            color="error"
                            onClick={this.handleLogout}
                        >
                            Sign out
                        </Typography>
                    </div>
                </Paper>
            ) : (
                <Paper className={classes.paper}>
                    <Typography
                        className={classes.customLoginText}
                        variant="body2"
                    >
                        You are currently not logged in. <br />
                        Please log in to view
                    </Typography>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={"/login"}
                    >
                        Login
                    </Button>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to={"/signup"}
                    >
                        Sign Up
                    </Button>
                </Paper>
            )
        ) : (
            <ProfileSkeleton />
        );

        return profileMarkup;
    }
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapActionsToProps = {
    logoutUser,
    uploadImage,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Profile));
