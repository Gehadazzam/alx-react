import { uiReducer, initialState } from "./uiReducer";
import {
  DISPLAY_NOTIFICATION_DRAWER,
  SELECT_COURSE,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../actions/uiActionTypes";
import { Map } from "immutable";

describe("uiReducer", () => {
  it("should return the initial state when no action is passed", () => {
    expect(uiReducer(undefined, {}).toJS()).toEqual(initialState.toJS());
  });

  it("should return the initial state when SELECT_COURSE action is passed", () => {
    expect(uiReducer(undefined, { type: SELECT_COURSE }).toJS()).toEqual(
      initialState.toJS()
    );
  });

  it("should change isNotificationDrawerVisible to true when DISPLAY_NOTIFICATION_DRAWER action is passed", () => {
    const state = uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER });
    expect(state.get("isNotificationDrawerVisible")).toBe(true);
  });

  it("should change isNotificationDrawerVisible to false when HIDE_NOTIFICATION_DRAWER action is passed", () => {
    const state = uiReducer(undefined, { type: HIDE_NOTIFICATION_DRAWER });
    expect(state.get("isNotificationDrawerVisible")).toBe(false);
  });

  it("should change isUserLoggedIn to true when LOGIN_SUCCESS action is passed", () => {
    const state = uiReducer(undefined, { type: LOGIN_SUCCESS });
    expect(state.get("isUserLoggedIn")).toBe(true);
  });

  it("should change isUserLoggedIn to false when LOGIN_FAILURE action is passed", () => {
    const state = uiReducer(undefined, { type: LOGIN_FAILURE });
    expect(state.get("isUserLoggedIn")).toBe(false);
  });

  it("should change isUserLoggedIn to false when LOGOUT action is passed", () => {
    const state = uiReducer(undefined, { type: LOGOUT });
    expect(state.get("isUserLoggedIn")).toBe(false);
  });
});
