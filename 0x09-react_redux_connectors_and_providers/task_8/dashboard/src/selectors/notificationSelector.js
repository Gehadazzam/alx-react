import { createSelector } from "reselect";

// Selector for the filter
export const filterTypeSelected = (state) => state.notifications.filter;

// Selector for all notifications
export const getNotifications = createSelector(
  (state) => state.notifications.notifications,
  (notifications) => new Map(Object.entries(notifications))
);

// Selector for unread notifications by type
export const getUnreadNotificationsByType = createSelector(
  [getNotifications, filterTypeSelected],
  (notifications, filter) => {
    if (filter === "urgent") {
      return new Map(
        Array.from(notifications).filter(
          ([_, notification]) =>
            !notification.isRead && notification.type === "urgent"
        )
      );
    } else {
      return new Map(
        Array.from(notifications).filter(
          ([_, notification]) => !notification.isRead
        )
      );
    }
  }
);
