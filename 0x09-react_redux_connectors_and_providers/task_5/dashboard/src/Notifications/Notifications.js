import React, { Component } from "react";
import close_icon from "../assets/close-icon.png";
import NotificationItem from "./NotificationItem";
import PropTypes from "prop-types";
import NotificationItemShape from "./NotificationItemShape";

import { css, StyleSheet } from "aphrodite";

const opacityAnimation = {
  from: {
    opacity: 0.5,
  },

  to: {
    opacity: 1,
  },
};

const translateAnimation = {
  "0%": { transform: "translateY(0)" },
  "50%": { transform: "translateY(-5px)" },
  "75%": { transform: "translateY(5px)" },
  "100%": { transform: "translateY(0)" },
};

const styles = StyleSheet.create({
  Notification: {
    padding: "1em",
    border: "2px dashed #000000",
    position: "absolute",
    top: "2.3em",
    right: "0",
    zIndex: "9999",
    "@media (max-width: 900px)": {
      position: "absolute",
      display: "block",
      top: "0",
      height: "100vh",
      zIndex: "9999",
      background: "white",
      width: "100%",
      border: "none",
      fontSize: "20px",
      padding: "0",
    },
    ":hover": {
      borderColor: "#9F8289",
      transition: "2s",
    },
  },

  "notification-header": {
    display: "flex",
    justifyContent: "space-between",
  },

  MenuItem: {
    textAlign: "right",
    paddingRight: "2rem",
    backgroundColor: "#fff8f8",
    cursor: "pointer",
    "@media (max-width: 900px)": {
      display: "none",
    },
    ":hover": {
      animationName: [opacityAnimation, translateAnimation],
      animationDuration: "1s, 0.5s",
      animationIterationCount: 3,
    },
  },
  MenuItemHidden: {
    cursor: "auto",
    background: "#FFFFFF",
  },

  ulStyling: {
    "@media (max-width: 900px)": {
      padding: "0",
    },
  },
  closeButton: {
    background: "none",
    border: "none",
    position: "relative",
    right: "-92%",
    top: "-10%",
    cursor: "pointer",
    "@media (max-width: 900px)": {
      top: "0",
      background: "gray",
    },
  },
});

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    this.props.fetchNotifications().then((notifications) => {
      this.setState({ messages: notifications });
    });
  }

  render() {
    return (
      <React.Fragment>
        <div
          className={css(styles.MenuItem)}
          onClick={this.props.handleDisplayDrawer}
        >
          {this.props.displayDrawer ? (
            <p className={css(styles.MenuItemHidden)}>&nbsp;</p>
          ) : (
            <p>Your notifications</p>
          )}
        </div>
        {this.props.displayDrawer && (
          <div className={css(styles.Notification)}>
            <button
              type="button"
              aria-label="Close"
              className={css(styles.closeButton)}
              onClick={this.props.handleHideDrawer}
            >
              <img
                src={close_icon}
                alt="Close icon"
                style={{ width: "24px", height: "24px" }}
              />
            </button>
            <p>Here is the list of notifications</p>
            <ul className={css(styles.ulStyling)}>
              {this.state.messages.length > 0 ? (
                this.state.messages.map((message, index) => (
                  <NotificationItem
                    key={index}
                    type={message.type}
                    value={message.value}
                    html={message.html}
                    id={message.id}
                    markAsRead={this.props.markNotificationAsRead}
                  />
                ))
              ) : (
                <li>No new notification for now</li>
              )}
            </ul>
          </div>
        )}
      </React.Fragment>
    );
  }
}

Notifications.defaultProps = {
  displayDrawer: false,
  fetchNotifications: () => {},
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
};

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  fetchNotifications: PropTypes.func,
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markNotificationAsRead: () => {},
};

export default Notifications;
