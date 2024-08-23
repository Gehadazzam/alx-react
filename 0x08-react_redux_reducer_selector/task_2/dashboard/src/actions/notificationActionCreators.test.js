import {
  markAsAread,
  setNotificationFilter,
} from "./notificationActionCreators";
import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  NotificationTypeFilters,
} from "./notificationActionTypes";

describe("notificationActionCreators", () => {
  it("should create an action to mark as read", () => {
    const expectedAction = {
      type: MARK_AS_READ,
      index: 1,
    };
    expect(markAsAread(1)).toEqual(expectedAction);
  });

  it("should create an action to set notification filter", () => {
    const expectedAction = {
      type: SET_TYPE_FILTER,
      filter: "DEFAULT",
    };
    expect(setNotificationFilter(NotificationTypeFilters.DEFAULT)).toEqual(
      expectedAction
    );
  });
});
