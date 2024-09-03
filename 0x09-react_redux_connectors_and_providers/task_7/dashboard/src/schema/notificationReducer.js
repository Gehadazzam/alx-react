import { Map } from "immutable";
import { notificationsNormalizer } from "./notifications";
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  SET_TYPE_FILTER,
  MARK_AS_READ,
} from "../actions/notificationActionTypes";

// Initial state using Immutable.js Map
const initialState = Map({
  filter: "DEFAULT",
  notifications: Map({}),
});

// Notification reducer function
export function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      const normalizedData = notificationsNormalizer(action.data);
      return state.mergeDeep(
        Map({
          notifications: Map(normalizedData.entities.notifications || {}),
        })
      );

    case SET_TYPE_FILTER:
      return state.set("filter", action.filter);

    case MARK_AS_READ:
      return state.setIn(
        ["notifications", String(action.index), "isRead"],
        true
      );

    default:
      return state;
  }
}
