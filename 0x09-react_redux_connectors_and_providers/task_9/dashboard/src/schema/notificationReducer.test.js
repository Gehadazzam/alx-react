import { Map, fromJS } from "immutable";
import { notificationReducer } from "./notificationReducer";
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  SET_TYPE_FILTER,
  MARK_AS_READ,
} from "../actions/notificationActionTypes";

describe("notificationReducer", () => {
  it("should return the initial state", () => {
    const initialState = Map({
      filter: "DEFAULT",
      notifications: Map({}),
    });
    expect(notificationReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle FETCH_NOTIFICATIONS_SUCCESS", () => {
    const initialState = Map({
      filter: "DEFAULT",
      notifications: Map({}),
    });
    const action = {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
      ],
    };
    const expectedState = fromJS({
      filter: "DEFAULT",
      notifications: {
        1: { id: 1, type: "default", value: "New course available" },
        2: { id: 2, type: "urgent", value: "New resume available" },
      },
    });
    expect(notificationReducer(initialState, action).toJS()).toEqual(
      expectedState.toJS()
    );
  });

  it("should handle SET_TYPE_FILTER", () => {
    const initialState = Map({
      filter: "DEFAULT",
      notifications: Map({}),
    });
    const action = { type: SET_TYPE_FILTER, filter: "URGENT" };
    const expectedState = Map({
      filter: "URGENT",
      notifications: Map({}),
    });
    expect(notificationReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle MARK_AS_READ", () => {
    const initialState = fromJS({
      filter: "DEFAULT",
      notifications: {
        1: {
          id: 1,
          type: "default",
          value: "New course available",
          isRead: false,
        },
        2: {
          id: 2,
          type: "urgent",
          value: "New resume available",
          isRead: false,
        },
      },
    });
    const action = { type: MARK_AS_READ, index: 2 };
    const expectedState = initialState.setIn(
      ["notifications", "2", "isRead"],
      true
    );
    expect(notificationReducer(initialState, action)).toEqual(expectedState);
  });
});
