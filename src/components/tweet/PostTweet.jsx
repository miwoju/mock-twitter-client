import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { postTweet } from "../../redux/actions/dataActions";

//MUI
import CustomButton from "./CustomButton";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

//Icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
    ...theme.spreadThis,
    submitButton: {
        // position: "relative", this is for progress spinner
    },
});


/*
!After hitting submit with empty body, it gets error. However, after fixing and resubmitting, it'll still show error.
!This is fixed in dataActions.js { postTweet } by dispatching CLEAR_ERRORS at start of the function.
*/
class PostTweet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            body: "",
            open: false,
            errors: {},
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors,
            });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({
                body: "",
            });
            this.handleClose();
        }
    }
    handleOpen() {
        this.setState({
            open: true,
        });
    }
    handleClose() {
        this.setState({
            open: false,
            errors: {},
            //Moved to componentWillReceiveProps as it will handle the body reset and dialog close
            // body: "",
        });
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errors: {},
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        const newTweet = {
            body: this.state.body,
        };
        this.props.postTweet(newTweet);
    }

    render() {
        const { open, errors } = this.state;
        const {
            classes,
            UI: { loading },
        } = this.props;
        return (
            <Fragment>
                <CustomButton
                    toolTipTitle="Post a tweet"
                    btnOnClick={this.handleOpen}
                >
                    <AddIcon className="white-icon" />
                </CustomButton>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
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
                    <DialogTitle id="form-dialog-title">
                        Post a Tweet
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            id="body"
                            name="body"
                            type="text"
                            placeholder="What's happening?"
                            variant="filled"
                            margin="dense"
                            onChange={this.handleChange}
                            error={errors.error ? true : false}
                            helperText={errors.error}
                            multiline
                            rows="3"
                            fullWidth
                        ></TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button
                            className={classes.submitButton}
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={this.handleSubmit}
                            disabled={loading}
                        >
                            Post
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

PostTweet.propTypes = {
    classes: PropTypes.object.isRequired,
    postTweet: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    UI: state.UI,
});

const mapActionsToProps = {
    postTweet,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(PostTweet));
