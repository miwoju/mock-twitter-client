import React, { Component } from "react";
import PropTypes from "prop-types";
import appIcon from "../images/twitter-logo.png";
import { Link } from "react-router-dom";

//MUI
//import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//Redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles = (theme) => ({
    ...theme.spreadThis,
});

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "user@email.com",
            password: "123456",
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

    handleSubmit(event) {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.loginUser(userData, this.props.history);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errors: {},
        });
    }
    render() {
        //loading is now inside UI
        const {
            classes,
            UI: { loading },
        } = this.props;
        const { email, password, errors } = this.state;

        return (
            <div className={classes.page}>
                <img className={classes.image} src={appIcon} alt="blue-bird" />
                <Typography variant="h2" className={classes.pageTitle}>
                    Login
                </Typography>
                <form
                    noValidate
                    className={classes.form}
                    onSubmit={this.handleSubmit}
                >
                    <TextField
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        className={classes.textField}
                        value={email}
                        onChange={this.handleChange}
                        variant="outlined"
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        fullWidth
                        autoFocus
                    ></TextField>
                    <TextField
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        className={classes.textField}
                        value={password}
                        onChange={this.handleChange}
                        variant="outlined"
                        helperText={errors.password}
                        error={errors.password ? true : false}
                        fullWidth
                    ></TextField>
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
                        Login
                        {loading && (
                            <CircularProgress
                                size={30}
                                className={classes.progress}
                            />
                        )}
                    </Button>
                    <Typography
                        color="primary"
                        className={classes.signupText}
                        variant="body2"
                        component={Link}
                        to="/signup"
                    >
                        Don't have an account? Sign up for Twitter
                    </Typography>
                </form>
            </div>
        );
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
};

//lets us take state from global state from store.js and maps to this component's props, only needs user and ui, not data aka tweets because it's login
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
});

//lets us use this.props.loginUser. Basically tells which actions we're going to use
const mapActionsToProps = {
    loginUser,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(login));
