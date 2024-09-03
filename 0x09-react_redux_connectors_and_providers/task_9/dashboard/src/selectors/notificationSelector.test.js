import { Map, fromJS } from "immutable";
import {
  filterTypeSelected,
  getNotifications,
  getUnreadNotifications,
  getUnreadUrgentNotifications,
} from "./notificationSelector";

describe("notificationSelector", () => {
  const initialState = {
    notifications: fromJS({
      filter: "DEFAULT",
      notifications: {
        1: {
          id: 1,
          isRead: false,
          type: "default",
          value: "New course available",
        },
        2: {
          id: 2,
          isRead: true,
          type: "urgent",
          value: "New resume available",
        },
        3: {
          id: 3,
          isRead: false,
          type: "urgent",
          value: "New data available",
        },
      },
    }),
  };

  it("should select the filter type correctly", () => {
    const selected = filterTypeSelected(initialState);
    expect(selected).toEqual("DEFAULT");
  });

  it("should return a list of all message entities from the reducer", () => {
    const notifications = getNotifications(initialState);
    expect(notifications).toBeInstanceOf(Map);
    expect(notifications.size).toBe(3);
    expect(notifications.getIn([1, "value"])).toBe("New course available");
    expect(notifications.getIn([2, "value"])).toBe("New resume available");
    expect(notifications.getIn([3, "value"])).toBe("New data available");
  });

  it("should return a list of unread message entities from the reducer", () => {
    const unreadNotifications = getUnreadNotifications(initialState);
    expect(unreadNotifications).toBeInstanceOf(Map);
    expect(unreadNotifications.size).toBe(2);
    expect(unreadNotifications.getIn([1, "value"])).toBe(
      "New course available"
    );
    expect(unreadNotifications.getIn([3, "value"])).toBe("New data available");
    expect(unreadNotifications.get(2)).toBeUndefined();
  });

  it("should return a list of unread urgent message entities from the reducer", () => {
    const unreadUrgentNotifications =
      getUnreadUrgentNotifications(initialState);
    expect(unreadUrgentNotifications).toBeInstanceOf(Map);
    expect(unreadUrgentNotifications.size).toBe(1);
    expect(unreadUrgentNotifications.getIn([3, "value"])).toBe(
      "New data available"
    );
    expect(unreadUrgentNotifications.get(1)).toBeUndefined();
    expect(unreadUrgentNotifications.get(2)).toBeUndefined();
  });
});
