import React, { Component } from "react";
import PropTypes from "prop-types";
//MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";

//Redux
import { connect } from "react-redux";
import { postComment } from "../../redux/actions/dataActions";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
    ...theme.spreadThis,
});

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            body: "",
            errors: {},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors,
            })
        }if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({
                body: "",
                errors: {},
            })
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
        console.log(this.state.errors);
        this.props.postComment(this.props.tweetId, { body: this.state.body });
    }
    render() {
        const { classes, authenticated } = this.props;
        const { body, errors } = this.state;
        const commentFormMarkup = authenticated ? (
            <Grid item sm={12}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        className={classes.textField}
                        name="body"
                        type="text"
                        label="Comment on Tweet"
                        error={errors.error ? true : false}
                        helperText={errors.error}
                        value={body}
                        onChange={this.handleChange}
                        fullWidth
                    ></TextField>
                    <Button
                        className={classes.button}
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Post
                    </Button>
                </form>
                <hr className={classes.visibleSeparator} />
            </Grid>
        ) : null;
        return commentFormMarkup;
    }
}

CommentForm.propTypes = {
    postComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    tweetId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    UI: state.UI,
    authenticated: state.user.authenticated,
});

const mapActionsToProps = {
    postComment,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(CommentForm));
