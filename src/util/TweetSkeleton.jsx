import React, { Fragment } from "react";
import noImage from "../images/no-image.png";
import PropTypes from "prop-types";

//MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
    ...theme.spreadThis,
    cardContent: {
        width: "100%",
        flexDirection: "column",
        padding: 18,
    },
    cover: {
        width: 200,
        objectFit: "cover",
    },
    handle: {
        width: 80,
        height: 22,
        backgroundColor: theme.palette.primary.main,
        margin: "3 0 10 0",
    },
    date: {
        width: 100,
        height: 16,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        marginBottom: 13,
    },
    fullLine: {
        marginBottom: 7,
        width: "95%",
        height: 20,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    halfLine: {
        margin: "14 0 10 20",
        width: "48%",
        height: 22,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    }
});

const TweetSkeleton = (props) => {
    const { classes } = props;
    //Parentheses instead of Curly to outright return
    const content = Array.from({ length: 5 }).map((item, index) => (
        <Card key={index} className={classes.card}>
            <CardMedia className={classes.cover} image={noImage} />
            <CardContent className={classes.cardContent}>
                <div className={classes.handle} />
                <div className={classes.date} />
                <div className={classes.fullLine} />
                <div className={classes.fullLine} />
                <div className={classes.halfLine} />

            </CardContent>
        </Card>
    ));

    return <Fragment>{content}</Fragment>;
};

TweetSkeleton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TweetSkeleton);
