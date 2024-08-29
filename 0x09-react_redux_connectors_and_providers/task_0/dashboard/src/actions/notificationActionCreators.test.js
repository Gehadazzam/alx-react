import {
  markAsAread,
  setNotificationFilter,
  notificationReducer,
} from "./notificationActionCreators";
import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  NotificationTypeFilters,
  FETCH_NOTIFICATIONS_SUCCESS,
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

describe("notificationReducer", () => {
  it("should return the default state", () => {
    const state = notificationReducer(undefined, {});
    expect(state).toEqual({
      notifications: [],
      filter: "DEFAULT",
    });
  });

  it("should handle FETCH_NOTIFICATIONS_SUCCESS", () => {
    const initialState = {
      filter: "DEFAULT",
      notifications: [],
    };
    const action = {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: [
        {
          id: 1,
          type: "default",
          value: "New course available",
        },
        {
          id: 2,
          type: "urgent",
          value: "New resume available",
        },
        {
          id: 3,
          type: "urgent",
          value: "New data available",
        },
      ],
    };
    const expectedState = {
      filter: "DEFAULT",
      notifications: [
        {
          id: 1,
          isRead: false,
          type: "default",
          value: "New course available",
        },
        {
          id: 2,
          isRead: false,
          type: "urgent",
          value: "New resume available",
        },
        {
          id: 3,
          isRead: false,
          type: "urgent",
          value: "New data available",
        },
      ],
    };
    const state = notificationReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle MARK_AS_READ", () => {
    const initialState = {
      filter: "DEFAULT",
      notifications: [
        {
          id: 1,
          isRead: false,
          type: "default",
          value: "New course available",
        },
        {
          id: 2,
          isRead: false,
          type: "urgent",
          value: "New resume available",
        },
        {
          id: 3,
          isRead: false,
          type: "urgent",
          value: "New data available",
        },
      ],
    };
    const action = {
      type: MARK_AS_READ,
      index: 2,
    };
    const expectedState = {
      filter: "DEFAULT",
      notifications: [
        {
          id: 1,
          isRead: false,
          type: "default",
          value: "New course available",
        },
        {
          id: 2,
          isRead: true,
          type: "urgent",
          value: "New resume available",
        },
        {
          id: 3,
          isRead: false,
          type: "urgent",
          value: "New data available",
        },
      ],
    };
    const state = notificationReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle SET_TYPE_FILTER", () => {
    const initialState = {
      filter: "DEFAULT",
      notifications: [
        {
          id: 1,
          isRead: false,
          type: "default",
          value: "New course available",
        },
        {
          id: 2,
          isRead: false,
          type: "urgent",
          value: "New resume available",
        },
        {
          id: 3,
          isRead: false,
          type: "urgent",
          value: "New data available",
        },
      ],
    };
    const action = {
      type: SET_TYPE_FILTER,
      filter: "URGENT",
    };
    const expectedState = {
      filter: "URGENT",
      notifications: [
        {
          id: 1,
          isRead: false,
          type: "default",
          value: "New course available",
        },
        {
          id: 2,
          isRead: false,
          type: "urgent",
          value: "New resume available",
        },
        {
          id: 3,
          isRead: false,
          type: "urgent",
          value: "New data available",
        },
      ],
    };
    const state = notificationReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });
});
