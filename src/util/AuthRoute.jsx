import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types"

//deconstruct in arg itself, let authenticated in App.js, ...rest means whatever else
const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
    //...rest to spread all the props from the parameter, redirect home if authenticated
    <Route
        {...rest}
        render={(props) =>
            authenticated === true ? (
                <Redirect to="/" />
            ) : (
                <Component {...props} />
            )
        }
    />
);

AuthRoute.propTypes = {
    user: PropTypes.object
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(AuthRoute);
