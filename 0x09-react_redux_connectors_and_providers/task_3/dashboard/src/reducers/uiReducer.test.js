import rootReducer from "./rootReducer"; // Import the rootReducer instead of uiReducer
import { initialState as uiInitialState } from "./uiReducer"; // Import initialState from uiReducer
import { initialState as courseInitialState } from "./courseReducer"; // Import initialState from courseReducer
import { initialState as notificationInitialState } from "./notificationReducer"; // Import initialState from notificationReducer
import { DISPLAY_NOTIFICATION_DRAWER } from "../actions/uiActionTypes"; // Add this import

describe("rootReducer", () => {
  it("should return the initial state when no action is passed", () => {
    const expectedInitialState = {
      courses: courseInitialState,
      notifications: notificationInitialState,
      ui: uiInitialState,
    };
    expect(rootReducer(undefined, {})).toEqual(expectedInitialState);
  });

  it("should change isNotificationDrawerVisible to true when DISPLAY_NOTIFICATION_DRAWER action is passed", () => {
    const state = rootReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER });
    expect(state.ui.get("isNotificationDrawerVisible")).toBe(true);
  });
});
