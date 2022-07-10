import React, { Component } from "react";
import AppIcon from "../images/twitter-logo.png";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

//Redux
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

const styles = (theme) => ({
    ...theme.spreadThis,
});

class signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handle: "user",
            email: "user@email.com",
            password: "123456",
            confirmPassword: "123456",
            errors: {},
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors,
            });
        }
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errors: {},
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const newUserData = {
            handle: this.state.handle,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
        };
        this.props.signupUser(newUserData, this.props.history)
   
    }

    render() {
        const {
            classes,
            UI: { loading },
        } = this.props;
        const {
            handle,
            email,
            password,
            confirmPassword,
            errors,
        } = this.state;

        return (
            <div className={classes.page}>
                <img className={classes.image} src={AppIcon} alt="blue-bird" />
                <Typography className={classes.pageTitle} variant="h2">
                    Signup
                </Typography>
                <form
                    noValidate
                    className={classes.form}
                    onSubmit={this.handleSubmit}
                >
                    <TextField
                        className={classes.textField}
                        value={handle}
                        id="handle"
                        name="handle"
                        type="text"
                        label="Username"
                        helperText={errors.handle}
                        error={errors.handle ? true : false}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <TextField
                        className={classes.textField}
                        value={email}
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <TextField
                        className={classes.textField}
                        value={password}
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        helperText={errors.password}
                        error={errors.password ? true : false}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <TextField
                        className={classes.textField}
                        value={confirmPassword}
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        label="Confirm password"
                        helperText={errors.confirmPassword}
                        error={errors.confirmPassword ? true : false}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <Typography
                        className={classes.customError}
                        variant="body2"
                        color="error"
                    >
                        {errors.general}
                    </Typography>
                    <Button
                        className={classes.button}
                        color="primary"
                        type="submit"
                        variant="contained"
                        disabled={loading}
                    >
                        Sign up
                    </Button>
                    <Typography
                        color="primary"
                        variant="body2"
                        component={Link}
                        to="/login"
                    >
                        Already have an account? Log in here
                    </Typography>
                </form>
            </div>
        );
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
});

const mapActionsToProps = {
    signupUser,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(signup));
