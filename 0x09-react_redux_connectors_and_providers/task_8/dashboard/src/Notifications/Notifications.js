import React, { useEffect, useState } from "react";
import close_icon from "../assets/close-icon.png";
import NotificationItem from "./NotificationItem";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchNotifications,
  markNotificationAsRead,
  setNotificationFilter,
} from "../actions/notificationActions"; // Import your action
import { getFilteredNotifications } from "../selectors/notificationSelectors"; // Import the selector

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
  filterButton: {
    margin: "10px",
    cursor: "pointer",
  },
});

const Notifications = ({
  displayDrawer,
  listNotifications,
  fetchNotifications,
  markNotificationAsRead,
  setNotificationFilter,
}) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchNotifications().then((notifications) => {
      setMessages(notifications);
    });
  }, [fetchNotifications]);

  const handleFilterChange = (filter) => {
    setNotificationFilter(filter);
  };

  return (
    <React.Fragment>
      <div
        className={css(styles.MenuItem)}
        onClick={displayDrawer ? () => {} : () => fetchNotifications()}
      >
        {displayDrawer ? (
          <p className={css(styles.MenuItemHidden)}>&nbsp;</p>
        ) : (
          <p>Your notifications</p>
        )}
      </div>
      {displayDrawer && (
        <div className={css(styles.Notification)}>
          <button
            type="button"
            aria-label="Close"
            className={css(styles.closeButton)}
            onClick={displayDrawer ? () => {} : () => fetchNotifications()}
          >
            <img
              src={close_icon}
              alt="Close icon"
              style={{ width: "24px", height: "24px" }}
            />
          </button>
          <p>Here is the list of notifications</p>
          <div>
            <button
              className={css(styles.filterButton)}
              onClick={() => handleFilterChange("URGENT")}
            >
              ‼️
            </button>
            <button
              className={css(styles.filterButton)}
              onClick={() => handleFilterChange("DEFAULT")}
            >
              💠
            </button>
          </div>
          <ul className={css(styles.ulStyling)}>
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <NotificationItem
                  key={index}
                  type={message.type}
                  value={message.value}
                  html={message.html}
                  id={message.id}
                  markAsRead={() => markNotificationAsRead(message.id)}
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
};

Notifications.defaultProps = {
  displayDrawer: false,
  fetchNotifications: () => {},
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
};

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.array,
  fetchNotifications: PropTypes.func.isRequired, // Update PropTypes
  markNotificationAsRead: PropTypes.func.isRequired, // Add PropTypes for markNotificationAsRead
  setNotificationFilter: PropTypes.func.isRequired, // Add PropTypes for setNotificationFilter
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
};

export default connect(
  (state) => ({
    listNotifications: getFilteredNotifications(state),
  }),
  { fetchNotifications, markNotificationAsRead, setNotificationFilter }
)(Notifications);
