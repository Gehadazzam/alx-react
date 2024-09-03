import { createSelector } from "reselect";

// Selector for the filter
export const filterTypeSelected = (state) => state.notifications.filter;

// Selector for all notifications
export const getNotifications = createSelector(
  (state) => state.notifications.notifications,
  (notifications) => new Map(Object.entries(notifications))
);

// Selector for unread notifications
export const getUnreadNotifications = createSelector(
  getNotifications,
  (notifications) =>
    new Map(
      Array.from(notifications).filter(
        ([_, notification]) => !notification.isRead
      )
    )
);
