import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CustomButton from "../tweet/CustomButton";

//MUI Icons
import EditIcon from "@material-ui/icons/Edit";

//Redux
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";

const styles = (theme) => ({
    ...theme.spreadThis,
    button: {
        float: "right",
    },
});

class EditDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: "",
            website: "",
            location: "",
            open: false,
            //credentials: ...
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //editUserDetails()
    }
    componentDidMount() {
        this.mapUserDetailsToState(this.props.credentials);
    }

    mapUserDetailsToState(credentials) {
        const { bio, website, location } = credentials;
        this.setState({
            bio: bio ? bio : "",
            website: website ? website : "",
            location: location ? location : "",
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleOpen() {
        this.setState({
            open: true,
        });
        //Remaps the initial state, in case user clicked "cancel" previously
        this.mapUserDetailsToState(this.props.credentials);
    }

    handleClose() {
        this.setState({
            open: false,
        });
    }
    handleSubmit() {
        const { bio, website, location } = this.state;
        const userDetails = {
            bio: bio,
            website: website,
            location: location,
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

    render() {
        // const { classes } = this.props;
        const { bio, website, location, open } = this.state;
        const { classes } = this.props;
        return (
            <Fragment>
                <CustomButton
                    toolTipTitle="Edit profile"
                    btnOnClick={this.handleOpen}
                    btnClassName={classes.button}
                >
                    <EditIcon color="primary" />
                </CustomButton>
                {/**handleClose is needed here to autoclose if clicked outside of dialog*/}
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    maxWidth="sm"
                >
                    <DialogTitle id="form-dialog-title">
                        Edit Details
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            value={bio}
                            name="bio"
                            variant="outlined"
                            margin="dense"
                            id="bio"
                            label="Bio"
                            type="text"
                            onChange={this.handleChange}
                            //makes it textArea
                            multiline
                            rows="3"
                            placeholder="I like to eat and go places..."
                            fullWidth
                        />
                        <TextField
                            value={website}
                            name="website"
                            variant="outlined"
                            margin="dense"
                            id="website"
                            label="Website"
                            type="text"
                            onChange={this.handleChange}
                            placeholder="My personal website..."
                            fullWidth
                        />
                        <TextField
                            value={location}
                            name="location"
                            variant="outlined"
                            margin="dense"
                            id="location"
                            label="Location"
                            type="text"
                            onChange={this.handleChange}
                            placeholder="London, UK..."
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials,
});

const mapActionsToProps = {
    editUserDetails,
};

EditDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    editUserDetails: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(EditDetails));
