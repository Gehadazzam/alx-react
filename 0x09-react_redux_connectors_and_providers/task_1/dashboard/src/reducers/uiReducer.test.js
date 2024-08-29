import { uiReducer, initialState } from "./uiReducer";
import {
  DISPLAY_NOTIFICATION_DRAWER,
  SELECT_COURSE,
} from "../actions/uiActionTypes";

describe("uiReducer", () => {
  it("should return the initial state when no action is passed", () => {
    expect(uiReducer(undefined, {})).toEqual(initialState);
  });

  it("should return the initial state when SELECT_COURSE action is passed", () => {
    expect(uiReducer(undefined, { type: SELECT_COURSE })).toEqual(initialState);
  });

  it("should change isNotificationDrawerVisible to true when DISPLAY_NOTIFICATION_DRAWER action is passed", () => {
    const state = uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER });
    expect(state.isNotificationDrawerVisible).toBe(true);
  });
});
