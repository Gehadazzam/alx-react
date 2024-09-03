import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchNotifications } from "../actions/notificationActions";
import Notifications from "./Notifications";

class NotificationsContainer extends Component {
  componentDidMount() {
    this.props.fetchNotifications();
  }

  render() {
    return <Notifications notifications={this.props.notifications} />;
  }
}

const mapStateToProps = (state) => ({
  notifications: state.notifications,
});

export default connect(mapStateToProps, { fetchNotifications })(
  NotificationsContainer
);
