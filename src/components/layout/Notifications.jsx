import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//MUI
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

//redux
import { connect } from "react-redux";
import { markNotificationRead } from "../../redux/actions/userActions";

//Icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import LikeIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

//dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onMenuOpened = this.onMenuOpened.bind(this);
    }

    handleClick(event) {
        this.setState({
            anchorEl: event.target,
        });
    }
    handleClose() {
        this.setState({
            anchorEl: null,
        });
    }
    onMenuOpened() {
        let unreadNotificationsIds = this.props.notifications
            .filter((notification) => !notification.read)
            .map((unreadNotification) => unreadNotification.notificationId);
        this.props.markNotificationRead(unreadNotificationsIds);
    }

    render() {
        dayjs.extend(relativeTime);

        const { anchorEl } = this.state;
        const { notifications } = this.props;

        let unreadNotificationCount = notifications.filter(
            (notification) => notification.read === false
        ).length;
        //If it's comment notification, like notification, etc.
        let notificationsIcon = (
            <Badge badgeContent={unreadNotificationCount} color="secondary">
                <NotificationsIcon className="white-icon" />
            </Badge>
        );

        let notificationsMarkup =
            notifications && notifications.length > 0 ? (
                notifications.map((notification) => {
                    const verb =
                        notification.type === "like" ? "liked" : "commented on";
                    const time = dayjs(notification.createdAt).fromNow();
                    const iconColor = notification.read
                        ? "primary"
                        : "secondary";
                    const icon =
                        notification.type === "like" ? (
                            <LikeIcon
                                color={iconColor}
                                style={{ marginRight: 10 }}
                            />
                        ) : (
                            <ChatIcon
                                color={iconColor}
                                style={{ marginRight: 10 }}
                            />
                        );
                    return (
                        <MenuItem
                            key={notification.createdAt}
                            onClick={this.handleClose}
                        >
                            {icon}
                            <Typography
                                color="default"
                                variant="body1"
                                component={Link}
                                to={`/users/${notification.recipient}/tweet/${notification.tweetId}`}
                            >
                                {notification.sender} {verb} your tweet {time} 
                            </Typography>
                        </MenuItem>
                    );
                })
            ) : (
                <MenuItem onClick={this.handleClose}>
                    You don't have any notifications yet
                </MenuItem>
            );

        return (
            <Fragment>
                <Tooltip title="Notifications">
                    <IconButton
                        aria-owns={anchorEl ? "simple-menu" : undefined}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                    >
                        {notificationsIcon}
                    </IconButton>
                </Tooltip>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpened}
                >
                    {notificationsMarkup}
                </Menu>
            </Fragment>
        );
    }
}

Notifications.propTypes = {
    markNotificationRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    notifications: state.user.notifications,
});
const mapActionsToProps = {
    markNotificationRead,
};

export default connect(mapStateToProps, mapActionsToProps)(Notifications);
