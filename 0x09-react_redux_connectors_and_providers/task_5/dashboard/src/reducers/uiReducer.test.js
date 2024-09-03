import { uiReducer, initialState } from "./uiReducer";
import { TOGGLE_NOTIFICATION_DRAWER } from "../actions/uiActionTypes";
import { DISPLAY_NOTIFICATION_DRAWER } from "../actions/uiActionTypes"; // Add this import

describe("uiReducer", () => {
  it("should return the initial state when no action is passed", () => {
    expect(uiReducer(undefined, {})).toEqual(initialState);
  });

  it("should change isNotificationDrawerVisible to true when DISPLAY_NOTIFICATION_DRAWER action is passed", () => {
    const state = uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER });
    expect(state.get("isNotificationDrawerVisible")).toBe(true);
  });

  it("should toggle isNotificationDrawerVisible when TOGGLE_NOTIFICATION_DRAWER action is passed", () => {
    const initialState = Map({ isNotificationDrawerVisible: false });
    const newState = uiReducer(initialState, {
      type: TOGGLE_NOTIFICATION_DRAWER,
    });
    expect(newState.get("isNotificationDrawerVisible")).toBe(true);
  });
});
