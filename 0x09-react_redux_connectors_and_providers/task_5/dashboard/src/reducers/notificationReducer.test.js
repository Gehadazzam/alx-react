import { SET_LOADING_STATE, SET_NOTIFICATIONS } from "../actions/types";
import notificationReducer from "../reducers/notificationReducer";

describe("notificationReducer", () => {
  it("should handle SET_LOADING_STATE", () => {
    const action = { type: SET_LOADING_STATE, isLoading: true };
    const newState = notificationReducer(undefined, action);
    expect(newState.isLoading).toBe(true);
  });

  it("should handle SET_NOTIFICATIONS", () => {
    const action = { type: SET_NOTIFICATIONS, notifications: [] };
    const newState = notificationReducer(undefined, action);
    expect(newState.notifications).toEqual([]);
  });

  // Add more tests for actions if needed
});
