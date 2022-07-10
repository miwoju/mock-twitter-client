import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import PostTweet from "../tweet/PostTweet"
import Notifications from "./Notifications"

//MUI stuff
import styled from "@material-ui/core/styles/styled";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import CustomButton from "../tweet/CustomButton";
import Grid from "@material-ui/core/Grid";

//Redux
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";

//Icons
import HomeIcon from "@material-ui/icons/Home";

const StyledToolbar = styled(Toolbar)({
    "& .white-icon": {
        color: "#fff",
    },
    "& .nav-items": {
        textAlign: "center",
    },
});

class Navbar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
            <AppBar>
                <StyledToolbar>
                    <Grid container alignItems="center">
                        {authenticated ? (
                            <Fragment>
                                <Grid item xs={1} />
                                <Grid item xs={10} className="nav-items">
                                    <PostTweet />
                                    <Link to="/">
                                        <CustomButton toolTipTitle="Home">
                                            <HomeIcon className="white-icon" />
                                        </CustomButton>
                                    </Link>
                                        <Notifications />
                                </Grid>
                                <Grid item xs={1}>
                                    <Button
                                        color="inherit"
                                        onClick={this.props.logoutUser}
                                    >
                                        Logout
                                    </Button>
                                </Grid>
                            </Fragment>
                        ) : (
                            <Grid item xs={12} className="nav-items">
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to="/login"
                                >
                                    Login
                                </Button>
                                <Button color="inherit" component={Link} to="/">
                                    Home
                                </Button>
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to="/signup"
                                >
                                    Signup
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                </StyledToolbar>
            </AppBar>
        );
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
});

const mapActionsToProps = {
    logoutUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Navbar);
